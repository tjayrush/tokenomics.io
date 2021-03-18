#!/usr/bin/env bash

git pull
yarn build
yes | cp -pr build/* /home/jrush/Websites/tokenomics.io/gitcoin/
yes | cp -pR charts/* /home/jrush/Websites/tokenomics.io/gitcoin/charts/
