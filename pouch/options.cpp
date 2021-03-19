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

//---------------------------------------------------------------------------------------------------
static const COption params[] = {
    COption("freshen", "f", "", OPT_SWITCH, "the command to run"),
    COption("json2csv", "j", "", OPT_SWITCH, "folder containing TurboGeth data file (data.mdb)"),
    COption("csv2json", "c", "", OPT_SWITCH, "for 'dump' command only, the name of the table to dump"),
    COption("lastBlock", "l", "", OPT_SWITCH, "show the last export for each grant"),
    COption("", "", "", OPT_DESCRIPTION, "This is what the program does.\n"),
};
static const size_t nParams = sizeof(params) / sizeof(COption);

//---------------------------------------------------------------------------------------------------
bool COptions::parseArguments(string_q& command) {
    if (!standardOptions(command))
        return false;

    Init();
    explode(arguments, command, ' ');
    for (auto arg : arguments) {
        string_q orig = arg;
        if (false) {
            // do nothing -- make auto code generation easier
            // BEG_CODE_AUTO
        } else if (arg == "-f" || arg == "--freshen") {
            freshen = true;

        } else if (arg == "-j" || arg == "--json2csv") {
            json2csv = true;

        } else if (arg == "-c" || arg == "--csv2json") {
            csv2json = true;

        } else if (arg == "-l" || arg == "--lastBlock") {
            lastBlock = true;

        } else if (startsWith(arg, '-')) {  // do not collapse

            if (!builtInCmd(arg)) {
                return usage("Invalid option: " + arg);
            }

            // END_CODE_AUTO
        }
    }

    // BEG_DEBUG_DISPLAY
    LOG_TEST_BOOL("freshen", freshen);
    LOG_TEST_BOOL("json2csv", json2csv);
    LOG_TEST_BOOL("csv2json", csv2json);
    LOG_TEST_BOOL("lastBlock", lastBlock);
    // END_DEBUG_DISPLAY

    if (lastBlock + (json2csv || csv2json) > 1)
        return usage("Choose either --lastBlock or one of the converters, not both.");

    if (json2csv && csv2json)
        return usage("Choose on of --json2csv or --csv2json, not both.");

    if (json2csv)
        return handle_json_2_csv();

    if (csv2json)
        return handle_csv_2_json();

    if (lastBlock)
        return handle_last_block();

    return true;
}

//---------------------------------------------------------------------------------------------------
void COptions::Init(void) {
    registerOptions(nParams, params);

    // BEG_CODE_INIT
    freshen = false;
    json2csv = false;
    csv2json = false;
    lastBlock = false;
    // END_CODE_INIT
}

//---------------------------------------------------------------------------------------------------
COptions::COptions(void) {
    setSorts(GETRUNTIME_CLASS(CBlock), GETRUNTIME_CLASS(CTransaction), GETRUNTIME_CLASS(CReceipt));
    Init();
}

//--------------------------------------------------------------------------------
COptions::~COptions(void) {
}

//--------------------------------------------------------------------------------
bool COptions::handle_last_block(void) {
    blknum_t latest = getBlockProgress(BP_CLIENT).client;
    freshenTimestamps(latest);
    size_t nTimestamps;
    loadTimestampFile(nullptr, nTimestamps);
    uint32_t *tsArray = new uint32_t[(nTimestamps * 2) + 1]; // little bit of extra room
    loadTimestampFile(&tsArray, nTimestamps);
    CAccountNameArray grants;
    loadGrantList(grants);
    for (auto grant : grants) {
        if (shouldQuit())
            break;
        ostringstream cmd;
        cmd << "tail -1 data/" << grant.address << ".csv | sed 's/\\\"//g' | cut -f1 -d, | sed 's/blocknumber/" << latest << "/'";
        blknum_t last = str_2_Uint(doCommand(cmd.str()));
        timestamp_t ts = tsArray[(last * 2)+1];
        time_q date = ts_2_Date(ts);
        cout << grant.address << "\t" << last << "\t" << ts << "\t" << date.Format(FMT_JSON) << endl;
        usleep(10000);
    }

    return true;
}
