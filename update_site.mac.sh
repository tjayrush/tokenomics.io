#!/usr/bin/env bash

cd pouch
# touch *.cpp
make
bin/pouch --freshen
cd -
#yarn build
#yes | cp -pr build/* /home/jrush/Websites/tokenomics.io/
