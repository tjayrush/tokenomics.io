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
    COption("summarize", "s", "<blknum>", OPT_HIDDEN | OPT_DEPRECATED, "summarize the data from the smart contracts"),
    COption("audit", "l", "", OPT_SWITCH, "audit the data"),
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

        } else if (startsWith(arg, "-s:") || startsWith(arg, "--summarize:")) {
            if (!confirmUint("summarize", summarize, arg))
                return false;

        } else if (arg == "-a" || arg == "--audit") {
            audit = true;

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
    LOG_TEST_BOOL("audit", audit);
    //LOG_TEST("summarize", summarize);
    // END_DEBUG_DISPLAY

    if (json2csv && csv2json)
        return usage("Choose on of --json2csv or --csv2json, not both.");

    if (!loadTimestamps())
        return usage("Could not load timestamps file");

    if (json2csv)
        return handle_json_2_csv();

    if (csv2json)
        return handle_csv_2_json();

    if (summarize)
        return handle_summarize();

    if (audit)
        return handle_audit();

    return true;
}

//---------------------------------------------------------------------------------------------------
void COptions::Init(void) {
    registerOptions(nParams, params);

    // BEG_CODE_INIT
    freshen = false;
    json2csv = false;
    csv2json = false;
    audit = false;
    summarize = 0;
    // END_CODE_INIT

    if (tsArray)
        delete [] tsArray;
    tsArray = nullptr;
    tsCnt = 0;
}

//---------------------------------------------------------------------------------------------------
COptions::COptions(void) {
    setSorts(GETRUNTIME_CLASS(CBlock), GETRUNTIME_CLASS(CTransaction), GETRUNTIME_CLASS(CReceipt));
    tsArray = nullptr;
    tsCnt = 0;
    Init();
}

//--------------------------------------------------------------------------------
COptions::~COptions(void) {
}

//--------------------------------------------------------------------------------
bool COptions::loadTimestamps(void) {
    if (tsArray)
        return true;

    if (!freshenTimestamps(getBlockProgress(BP_CLIENT).client)) {
        LOG_INFO("Failed to freshen timestamps");
        return false;
    }

    if (loadTimestampFile(nullptr, tsCnt)) {
        // LOG_INFO("Found ", tsCnt, " timestamps");
        tsArray = new uint32_t[(tsCnt * 2) + 2];  // little bit of extra room
        bool ret = loadTimestampFile(&tsArray, tsCnt);
        LOG_INFO("Loaded ", tsCnt, " timestamps to ", tsArray);
        return ret;
    }
    LOG_INFO("Failed to load timestamps");
    return false;
}
