
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

class CBucket {
  public:
    blknum_t seen;
    blknum_t curBucket;
    blknum_t bucketSize;
    size_t cnt;
    CBucket(void) : seen(0), curBucket(10244000), bucketSize(1000), cnt(0) {
    }
};

//--------------------------------------------------------------------
bool visitDonation(const char* line, void* data) {
    CBucket* bucket = (CBucket*)data;
    bucket->seen++;
    static bool first = true;
    if (first) {  // header
        first = false;
        return true;
    }

    blknum_t block = str_2_Uint(&line[1]);
    blknum_t moddy = (block / bucket->bucketSize) * bucket->bucketSize;
    blknum_t prev = bucket->curBucket;
//    cout << " seen: " << padNum9T(bucket->seen);
//    cout << " block: " << padNum9T(block);
//    cout << " moddy: " << padNum9T(moddy);
//    cout << " prev: " << padNum9T(prev);
//    cout << " size: " << padNum9T(bucket->bucketSize);
    if (moddy > prev && moddy != prev) {
        blknum_t diff = (moddy - prev);
        if (diff != bucket->bucketSize) {
            while (block > 10245999 && diff > bucket->bucketSize) {
                cout << prev << "\t0" << endl;
                cout.flush();
                prev += bucket->bucketSize;
                diff = (moddy - prev);
                //usleep(1000000);
            }
        }
        bucket->curBucket = moddy;
        cout << prev << "\t" << bucket->seen << endl;
        bucket->seen = 0;
//         cout << " cur: " << padNum9T(moddy);
//         cout << " prev: " << padNum9T(prev);
//         cout << " cur: " << padNum9T(moddy);
//         cout << " diff: " << padNum9T(diff);
//         cout << endl;
    } else {
//         cout << "\r";
//         cout.flush();
    }
    return !shouldQuit();
}

//--------------------------------------------------------------------
bool COptions::handle_summarize(void) {
    CBucket bucket;
    bucket.bucketSize = summarize;
    forEveryLineInAsciiFile("./data/" + STR_ROUND8 + ".csv", visitDonation, &bucket);
    cout << bucket.curBucket << "\t" << bucket.seen << endl;
    return !shouldQuit();
}
