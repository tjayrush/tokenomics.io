#!/usr/bin/env bash

chifra export --logs --articulate --cache_txs --cache_traces --emitted_by 0x7d655c57f71464b6f83811c55d84009cd9f5221c --fmt json $1 >pouch/data/$1.json
chifra export --logs --articulate --cache_txs --cache_traces --emitted_by 0x7d655c57f71464b6f83811c55d84009cd9f5221c --fmt csv $1 >pouch/data/$1.csv
sleep .2
