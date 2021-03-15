#!/usr/bin/env bash

cd pouch
touch *.cpp
make
bin/pouch >../src/grants-data.js
cd -
yarn build
yes | cp -pr build/* /home/jrush/Websites/tokenomics.io/
