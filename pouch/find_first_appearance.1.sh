#!/usr/bin/env bash

chifra list --no_header $1 | head -1 | tr '\t' '|'
rm -f "~/.quickBlocks/cache/monitors/$1.*"
sleep .2
