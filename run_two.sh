#!/usr/bin/env bash

echo "-------------------- $1 -----------------------"
echo -n "Total: "
cat pouch/data/$1.csv | grep DonationSent | wc | cut -c1-10
echo -n "Apps: "
cat pouch/data/$1.csv | grep DonationSent | grep $1 | wc | cut -c1-10
cat pouch/data/0xf2354570be2fb420832fb7ff6ff0ae0df80cf2c6.csv | grep PayoutAdded | grep $1 | cut -d, -f1,2,3,11-100
cat pouch/data/0xf2354570be2fb420832fb7ff6ff0ae0df80cf2c6.csv | grep PayoutClaimed | grep $1 | cut -d, -f1,2,3,11-100
echo
sleep .3
