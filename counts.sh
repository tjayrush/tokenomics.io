#!/usr/bin/env bash

cd pouch

make

bin/pouch --summarize    500 | tee ../charts/counts_000500.txt
bin/pouch --summarize   1000 | tee ../charts/counts_001000.txt
bin/pouch --summarize   2500 | tee ../charts/counts_002500.txt
bin/pouch --summarize   5000 | tee ../charts/counts_005000.txt
bin/pouch --summarize  10000 | tee ../charts/counts_010000.txt
bin/pouch --summarize  25000 | tee ../charts/counts_025000.txt
bin/pouch --summarize  50000 | tee ../charts/counts_050000.txt
bin/pouch --summarize 100000 | tee ../charts/counts_100000.txt

cd -
