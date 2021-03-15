#!/usr/bin/env bash

cd pouch
# touch *.cpp
make
bin/pouch >tmp.js
cat tmp.js >../src/grants-data.js
rm -f tmp.js
cd -
yarn build
yes | cp -pr build/* /home/jrush/Websites/tokenomics.io/
