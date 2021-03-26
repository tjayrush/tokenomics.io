import React from 'react';
import { DownloadIcon } from './Utils'


export const DataForNerds = () => {
  var record = { "tx_cnt": "1" };
  return (
    <div style={{textAlign: 'left'}}>
      <h3>Coming soon...</h3>
      <ul>
        <li>
          Uniq donors by date
           <DownloadIcon record={record} extra='Y' type='txt' />
        </li>
        <li>Uniq recipients by date</li>
        <li>Uniq donors by count</li>
        <li>Uniq recipients by count</li>
        <li>Donor counts by day</li>
        <li>Recipient counts by day</li>
        <li>Reciprocal pairs by day</li>
        <li>Donation amount by bucket</li>
        <li>Comparison of Round 8 to Round 9</li>
      </ul>
    </div>
  );
};
