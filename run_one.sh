#!/usr/bin/env bash

#chifra export --appearances $1 | cut -f2,3 >pouch/data/apps/$1.txt
#chifra export --logs --articulate --cache_txs --cache_traces --emitted_by 0xdf869fad6db91f437b59f1edefab319493d4c4ce --emitted_by 0xf2354570be2fb420832fb7ff6ff0ae0df80cf2c6 --emitted_by 0x7d655c57f71464b6f83811c55d84009cd9f5221c --fmt json $1 >pouch/data/$1.json
chifra export --logs --articulate --cache_txs --cache_traces --emitted_by 0xdf869fad6db91f437b59f1edefab319493d4c4ce --emitted_by 0xf2354570be2fb420832fb7ff6ff0ae0df80cf2c6 --emitted_by 0x7d655c57f71464b6f83811c55d84009cd9f5221c --fmt csv $1 >pouch/data/$1.csv
sleep .3
