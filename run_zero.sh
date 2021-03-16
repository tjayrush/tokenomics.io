#!/usr/bin/env bash

#chifra export --appearances $1 | cut -f2,3 >pouch/data/apps/$1.txt
#chifra export --logs --articulate --cache_txs --cache_traces --fmt json $1 >pouch/data/$1.json
chifra export --logs --articulate --cache_txs --cache_traces --fmt csv $1 >pouch/data/$1.csv
sleep .3
