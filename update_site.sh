#!/usr/bin/env bash

cd pouch
make
bin/pouch >../src/grants-data.js
cd -
#yarn build
#yes | cp -p build/* /home/jrush/Websites/tokenomics.io/
