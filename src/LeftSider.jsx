import React, {Fragment} from 'react';
import {Typography, Layout} from 'antd';

import './App.css';
import 'antd/dist/antd.css';

const {Sider} = Layout;
const {Paragraph, Text} = Typography;

const LeftSideItem = ({ question, answer }) => {
  return (
    <Fragment>
      <Paragraph style={{textDecoration: 'underline', fontWeight: 'bold', color: 'lightblue'}}>
        {question}
      </Paragraph>
      <Text style={{color: 'lightblue'}}>
        {answer}
      </Text>
      <br />
      <br />
    </Fragment>
  );
}

export const LeftSider = () => {
  return (
    <Sider style={{paddingLeft: '20px', paddingRight: '20px'}}>
      <LeftSideItem
        question='Download your data'
        answer={`
          Search for your own grant to the right and download your GitCoin Grant related logs.
        `}
      />
      <LeftSideItem
        question='What is a data pouch?'
        answer={`
          A data pouch is a place to store data. In this pouch, the data was extracted using TrueBlocks
          and our own local Ethereum node.
        `}
      />
      <LeftSideItem
        question='Why did you build this?'
        answer={`
          Mostly dogfooding, but also to provide others in our community an independant source of
          transparent data about the GitCoin smart contracts, donors, and grants.
        `}
      />
      <br />
      <br />
      <br />
      <br />
      <small>
        <Text style={{color: 'lightblue'}}>
          This website is <i>alpha</i>, which means you should use the data with caution.
        </Text>
      </small>
      <br />
      <br />
    </Sider>
  );
};
