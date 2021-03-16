#!/usr/bin/env bash

./for_mac.sh
cd pouch
rm data/records.bin
# touch *.cpp
make
bin/pouch --freshen
cd -
#yarn build
#yes | cp -pr build/* /home/jrush/Websites/tokenomics.io/
./for_linux.sh
