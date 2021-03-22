Data for Nerds
===============
Uniq donors by date
Uniq recipients by date

Uniq donors by count
Uniq recipients by count

Donor counts by day
Recipient counts by day
Reciprocal pairs by day

Donation amount by bucket



Chart ideas
===============
- Histogram of Contrib Amount  
- Scatter Contrib vs. Sybil score  
- Unclaimed from Round 8  
- Scatter plot of sybil score vs. time  
- Time vs. amount per sender (a lot of sends in not a person)  
- Heat maps are interesting  
- Distribution is important
- Mean is appearantly important


- latest data https://github.com/gitcoinco/gitcoin_cadcad_model/blob/main/data/2020-03-18/2021-03-18-round9-contributions.csv.xz

- From the Payout Contract there were:

- 1	Finalized calls
- 364	PayoutAdded calls
- 1	Transfer In
- 1	Funded calls
- 167 Transfer Outs
- 167	PayoutClaimed calls

- Function calls per contract

- The donations contract has 'dest' and 'donor' for each address that gave and received

- Chart of 'give to take'
    tit for tat

- Calculated estimate after each donation vs. actual

- Auditing

- Add up all donations from grant files and see if it adds to the total in the contract files

- Add the pre-round 4 contracts

- We did reconcilations of the PayoutAdded / PayoutClaimed and compared that against the smart contract. We could have called that a reconcilation and allow the user to download.