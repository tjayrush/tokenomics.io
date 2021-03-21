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
#include "options.h"
#include "logentry_min.h"

const string_q STR_PAYOUT = "0xf2354570be2fb420832fb7ff6ff0ae0df80cf2c6";
const string_q STR_ROUND8 = "0x7d655c57f71464b6f83811c55d84009cd9f5221c";
const string_q STR_ROUND5 = "0xdf869fad6db91f437b59f1edefab319493d4c4ce";

class CLogExportContext {
  public:
    CAbi abi;
    bool first;
    CArchive* archive;
    CLogExportContext(void) : first(true), archive(nullptr) {
    }
};

bool visitFile_csv_2_json(const string_q& path, void* data);
//--------------------------------------------------------------------
bool COptions::handle_csv_2_json(void) {
    CLogEntry_min::registerClass();
    SHOW_FIELD(CLogEntry_min, "topics");
    expContext().exportFmt = CSV1;
    configureDisplay("pouch", "CLogEntry_min", STR_DISPLAY_LOGENTRY_MIN);

    manageFields("CLogEntry_min:topics,articulatedLog", true);
    manageFields("CLogEntry:topics", true);

    manageFields("CLogEntry_min:topic0,topic1,topic2,topic3", false);
    manageFields("CLogEntry:topic0,topic1,topic2,topic3", false);
    manageFields("CFunction:type,stateMutability,signature,encoding", false);

    CLogExportContext context;
    context.abi.loadAbiFromEtherscan(STR_ROUND8);
    context.abi.loadAbiFromEtherscan(STR_ROUND5);
    context.abi.loadAbiFromEtherscan(STR_PAYOUT);
    forEveryFileInFolder("./data/", visitFile_csv_2_json, &context);
    return !shouldQuit();
}

//--------------------------------------------------------------------
bool visitLogLine(const char* line, void* data) {
    // skip header
    if (line[1] != '\0' && line[1] == 'b')
        return !shouldQuit();

    int nFields = 0;
    char* s = (char*)line;
    char* d = s;
    while (*s && nFields < 9) {
        if (*s != '\"') {
            if (*s == ',')
                nFields++;
            *d = *s;
            d++;
        }
        s++;
    }
    *d = '\0';
    
    if (nFields != 9)
        return !shouldQuit();

    CStringArray parts;
    explode(parts, line, ',');
    ASSERT(parts.size() == nFields);
    CLogEntry log;
    log.logIndex = str_2_Uint(parts[2]);
    log.address = parts[3];
    log.topics.push_back(parts[4]);
    log.topics.push_back(parts[5]);
    log.topics.push_back(parts[6]);
    log.topics.push_back(parts[7]);
    log.data = parts[8];
    CLogExportContext* ctx = (CLogExportContext*)data;
    ctx->abi.articulateLog(&log);

    CLogEntry_min logmin;
    logmin = log;
    logmin.blockNumber = str_2_Uint(parts[0]);
    logmin.transactionIndex = str_2_Uint(parts[1]);
    if (!ctx->first)
        (*ctx->archive).WriteLine(",");
    (*ctx->archive).WriteLine(logmin.Format()); // << "\n";  // do not change - won't compile
    ctx->first = false;

    return !shouldQuit();
}

int cnt = 0;
//--------------------------------------------------------------------
bool visitFile_csv_2_json(const string_q& path, void* data) {
    if (endsWith(path, '/')) {
        return forEveryFileInFolder(path + "*", visitFile_csv_2_json, data);
    } else {
        if (contains(path, "0x") && contains(path, ".csv") && !contains(path, "/apps/") && !contains(path, "/txs/")) {
            LOG_INFO("Processing file: ", path);
            string_q jsonFile = substitute(path, ".csv", ".json");
            CLogExportContext* ctx = (CLogExportContext*)data;
            ctx->first = true;
            CArchive archive(WRITING_ARCHIVE);
            if (archive.Lock(jsonFile, modeWriteCreate, LOCK_NOWAIT)) {
                ctx->archive = &archive;
                ctx->archive->WriteLine("{ \"data\": [");
                forEveryLineInAsciiFile(path, visitLogLine, data);
                ctx->archive->WriteLine("]}");
                archive.flush();
                archive.Release();
                LOG_INFO(cBlue, "  finised...", cOff);
                ostringstream cmd;
                cmd << "cat " << jsonFile << " | jq . >x ; cat x >" << jsonFile << endl;
                doCommand(cmd.str());
            } else {
                LOG_ERR("Could not open file: ", jsonFile);
            }
        }
    }

    return !shouldQuit();
}
