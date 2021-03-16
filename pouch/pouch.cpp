/*-------------------------------------------------------------------------------------------
 * qblocks - fast, easily-accessible, fully-decentralized data from blockchains
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 *
 * This program is free software: you may redistribute it and/or modify it under the terms
 * of the GNU General Public License as published by the Free Software Foundation, either
 * version 3 of the License, or (at your option) any later version. This program is
 * distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even
 * the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * General Public License for more details. You should have received a copy of the GNU General
 * Public License along with this program. If not, see http://www.gnu.org/licenses/.
 *-------------------------------------------------------------------------------------------*/
#include "etherlib.h"
#include "options.h"

extern const char *STR_OUTPUT;
extern const char *STR_BALANCE_OUTPUT;
extern bool loadGrantList(CAccountNameArray &grants);
extern bool loadRecords(CRecordArray &records);
extern bool saveRecords(const CRecordArray &records);
extern bool updateAll(CRecordArray &records, CAccountNameArray &grants);
extern bool updateSome(CRecordArray &records, const CAccountNameArray &grants);
extern bool updateOne(CRecord &record, CAccountName &grant, blknum_t latest);
static uint64_t key = 1;
//----------------------------------------------------------------
int main(int argc, const char *argv[])
{
    etherlib_init(quickQuitHandler);
    CRecord::registerClass();
    CBalance::registerClass();

    // Parse command line, allowing for command files
    COptions options;
    if (!options.prepareArguments(argc, argv))
        return 0;

    for (auto command : options.commandLines)
    {
        if (!options.parseArguments(command))
            return 0;

        CAccountNameArray grants;
        if (!loadGrantList(grants))
            return options.usage("Could not load grants list. Are you in the pouch folder?");

        CRecordArray records;
        if (!loadRecords(records))
        {
            key = 1;
            if (!updateAll(records, grants))
                return options.usage("Could not load records.");
        }

        while (!shouldQuit())
        {
            ostringstream os;
            os << "export const grantsData = [\n";
            for (auto record : records)
            {
                ostringstream oss;
                bool first = true;
                for (auto balance : record.balances)
                {
                    if (!first)
                        oss << ",";
                    oss << "[" << balance.Format(STR_BALANCE_OUTPUT) << "]";
                    first = false;
                }
                os << substitute(record.Format(STR_OUTPUT), "++BALANCES++", oss.str()) << endl;
            }
            stringToAsciiFile("../src/grants-data.js", os.str());
            cerr << "Sleeping for 28 seconds";
            size_t cnt = 0;
            while (++cnt < 28 && !shouldQuit())
            {
                cerr << ".";
                cerr.flush();
                sleep(1);
            }
            cerr << endl;
            key = 1;
            updateSome(records, grants);
            return 0;
        }
    }

    etherlib_cleanup();
    return 0;
}

//----------------------------------------------------------------
bool saveRecords(const CRecordArray &records)
{
    CArchive archive(WRITING_ARCHIVE);
    if (archive.Lock("./data/records.bin", modeWriteCreate, LOCK_WAIT))
    {
        archive << records;
        archive.Release();
        return true;
    }
    return false;
}

class CCheckup
{
public:
    CAddressBoolMap grantMap;
    CAddressBoolMap needsMap;
};

//----------------------------------------------------------------
bool visitAddrs(const CAppearance &item, void *data)
{
    cerr << "Checking address " << item.addr << "\r";
    cerr.flush();
    CCheckup *check = (CCheckup *)data;
    if (check->grantMap[item.addr] && !check->needsMap[item.addr]) {
        check->needsMap[item.addr] = true;
        cout << "Address " << item.addr << " needs update." << endl;
    }
    return true;
}

//----------------------------------------------------------------
bool transFilter(const CTransaction *trans, void *data)
{
    return true;
}

//----------------------------------------------------------------
bool updateSome(CRecordArray &records, const CAccountNameArray &grants)
{
    blknum_t latest = getBlockProgress(BP_CLIENT).client;
    blknum_t prev = str_2_Uint(asciiFileToString("./data/latest.txt"));
    cerr << "Loading map..." << endl;
    CCheckup checkup;
    for (auto grant : grants)
        checkup.grantMap[grant.address] = true;
    for (blknum_t bn = prev + 1; bn < latest; bn++)
    {
        CBlock block;
        cerr << "Getting block " << bn << " of " << latest << string_q(70, ' ') << "\r";
        cerr.flush();
        getBlock(block, bn);
        block.forEveryUniqueAppearanceInBlock(visitAddrs, NULL, &checkup);
    }

    cerr << "Done checking" << endl;
    for (auto entry : checkup.needsMap)
        cerr << "Address " << entry.first << " needs update." << endl;
    return true;
    //updateAll(records, g);
}

//----------------------------------------------------------------
bool updateAll(CRecordArray &records, CAccountNameArray &grants)
{
    blknum_t latest = getBlockProgress(BP_CLIENT).client;
    records.clear();
    for (auto grant : grants)
    {
        cerr << "Processing grant: " << grant.address << " " << grant.name.substr(0, 60) << endl;
        CRecord record;
        if (updateOne(record, grant, latest))
            records.push_back(record);
    }
    return saveRecords(records) && records.size();
}

//----------------------------------------------------------------
bool updateOne(CRecord &record, CAccountName &grant, blknum_t latest)
{
    string_q fn = getCachePath("monitors/" + toLower(grant.address) + ".acct.bin");
    bool exists = fileExists(fn);

    record.key = key++;

    record.grant_id = str_2_Uint(substitute(grant.name, "Grant ", ""));
    nextTokenClear(grant.name, ' ');
    nextTokenClear(grant.name, ' ');
    record.name = substitute(grant.name.substr(0, 60), "'", "&#39;");

    record.date = (exists ? fileLastModifyDate(fn).Format(FMT_JSON) : "n/a");
    record.type = "logs"; // types[key % 3];
    record.address = grant.address;
    record.slug = grant.source;
    record.core = contains(grant.tags, ":Core");

    CBalance bal;
    bal.asset = "ETH";
    wei_t balance = getBalanceAt(grant.address, latest);
    bal.balance = wei_2_Ether(balance);
    bal.balance = double_2_Str(str_2_Double(bal.balance), 12);
    record.balances.push_back(bal);

    string_q jsonFile = "./data/" + record.address + ".json";
    string_q csvFile = "./data/" + record.address + ".csv";
    record.tx_cnt = (exists ? (fileSize(fn) / sizeof(CAppearance_base)) : 0);
    if (fileExists(csvFile))
    {
        record.log_cnt = str_2_Uint(doCommand("wc " + csvFile));
        if (record.log_cnt > 0)
            record.log_cnt -= 1;
        record.donation_cnt = str_2_Uint(doCommand("cat " + csvFile + " | grep Donation | wc"));
    }
    else
    {
        record.log_cnt = record.tx_cnt;
        record.donation_cnt = 0;
    }
    stringToAsciiFile("./data/latest.txt", uint_2_Str(latest));
    return true;
}

//----------------------------------------------------------------
bool loadGrantList(CAccountNameArray &grants)
{
    CAccountName name;
    string_q contents = asciiFileToString("./grants.json");
    while (name.parseJson3(contents))
    {
        if (name.address == "0x322d58b9e75a6918f7e7849aee0ff09369977e08") // Skip this. It's both inactive and really big
            continue;
        name.address = toLower(name.address);
        grants.push_back(name);
        name = CAccountName();
    }
    return grants.size();
}

//----------------------------------------------------------------
bool loadRecords(CRecordArray &records)
{
    CArchive archive(READING_ARCHIVE);
    if (archive.Lock("./data/records.bin", modeReadOnly, LOCK_NOWAIT))
    {
        archive >> records;
        archive.Release();
        return true;
    }
    return false;
}

//----------------------------------------------------------------
const char *STR_OUTPUT =
    "  {\n"
    "    key: [{KEY}],\n"
    "    date: '[{DATE}]',\n"
    "    type: '[{TYPE}]',\n"
    "    grant_id: [{GRANT_ID}],\n"
    "    address: '[{ADDRESS}]',\n"
    "    name: '[{NAME}]',\n"
    "    slug: '[{SLUG}]',\n"
    "    tx_cnt: [{TX_CNT}],\n"
    "    log_cnt: [{LOG_CNT}],\n"
    "    donation_cnt: [{DONATION_CNT}],\n"
    "    balances: ++BALANCES++,\n"
    "    core: [{CORE}],\n"
    "  },";

//----------------------------------------------------------------
const char *STR_BALANCE_OUTPUT =
    "{\n"
    "      asset: 'ETH',\n"
    "      balance: '[{BALANCE}]'\n"
    "    }";
