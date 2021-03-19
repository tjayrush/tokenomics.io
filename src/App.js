import React, {Fragment, useEffect, useState} from 'react';
import {Input, Typography, Layout, Tabs} from 'antd';
import {Table as AntTable} from 'antd';
import {Affix} from 'antd';

import './App.css';
import 'antd/dist/antd.css';

import {grantsData} from './grants-data.js';
import { columns } from './data-columns.js';
import { RightSider } from './RightSider.js'
import { Foot } from './Foot.js'

const { Header, Sider, Content } = Layout;
const { Title, Paragraph, Text } = Typography;
const { Search } = Input;
const {TabPane} = Tabs;
const Table = (props) => {
  const pag = {
    size: 'small',
    position: ['topRight', 'none'],
    hideOnSinglePage: true,
    showSizeChanger: false,
    showTotal: (total, range) => '(' + total + ' grants) ',
  };
  return <AntTable className='table-striped-rows' pagination={pag} size='small' bordered={true} {...props} />;
};

function callback(key) {
  console.log(key);
}

function App() {
  return (
    <Layout className='App' style={{backgroundColor: '#e7dddc'}}>
      <Affix offsetTop={0}>
        <Head />
      </Affix>
      <Layout>
        <LeftSider />
        <Content style={{padding: '10px', paddingLeft: '10px', backgroundColor: 'lightblue'}}>
          <Layout>
            <HomePage />
            <RightSider />
          </Layout>
        </Content>
      </Layout>
      <Affix offsetBottom={0}>
        <Foot />
      </Affix>
    </Layout>
  );
}
export default App;

export const Head = () => {
  return (
    <Header style={{height: '100px'}}>
      <Typography>
        <Title style={{color: 'lightblue'}}>
          GitCoin Grant Data Pouch
          <br />
          <small>
            <small>
              <font style={{color: 'lightblue'}}>
                A <Text type='warning'>permissionlessly</Text> built gift to the GitCoin Community
              </font>
            </small>
          </small>
        </Title>
      </Typography>
    </Header>
  );
};

export const SiderEntry = ({ question, answer }) => {
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
      <SiderEntry
        question='What is a data pouch?'
        answer='A data pouch is a place to store data. In this case, the data was extracted using TrueBlocks and our own local Ethereum node. We will update the site periodically.'
      />
      <SiderEntry
        question='Why did you build this?'
        answer='Mostly dogfooding, but also to provide others in our community an independant source of complete, transparent data about GitCoin smart contracts, donors, and grants.'
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

export const HomePage = () => {
  const [searchText, setSearchText] = useState('');
  const [defKey, setDefKey] = useState('1');

  const onSearch = (value) => {
    setSearchText(value.toLowerCase());
    console.log(value);
  };

  const contractData = grantsData.filter((item) => {
    const n = item.name.toLowerCase();
    const a = item.address.toLowerCase();
    return item.core && (searchText === '' || n.includes(searchText) || a.includes(searchText));
  });
  const grantData = grantsData.filter((item) => {
    const n = item.name.toLowerCase();
    const a = item.address.toLowerCase();
    return !item.core && (searchText === '' || n.includes(searchText) || a.includes(searchText));
  });

  useEffect(() => {
    setDefKey(!!contractData && contractData !== [] ? '1' : '2');
  }, [searchText, contractData]);

  const tab1Title = 'Donation Contracts (' + contractData.length + ')';
  const tab2Title = 'Individual Grants (' + grantData.length + ')';
  return (
    <Content>
      <div style={{display: 'grid', gridTemplateColumns: '3fr 1fr'}}>
        <div></div>
        <Search
          style={{paddingRight: '2px'}}
          width='10px'
          placeholder='search grants by address or name...'
          onSearch={onSearch}
          enterButton></Search>
      </div>
      <Tabs defaultActiveKey={defKey} onChange={callback} style={{border: '1px dotted gray', padding: '4px'}}>
        <TabPane tab={tab2Title} key='1' style={{paddingLeft: '8px'}}>
          <Table dataSource={grantData} columns={columns} />
        </TabPane>
        <TabPane tab={tab1Title} key='2' style={{paddingLeft: '8px'}}>
          <Table dataSource={contractData} columns={columns} />
        </TabPane>
        <TabPane tab='Charts' key='3' style={{paddingLeft: '8px'}}>
          The future home of some charts
          <br />
          <img width='640px' alt='Count By Date' src='http://tokenomics.io/gitcoin/charts/Donation Count by Date.png' />
        </TabPane>
      </Tabs>
      <i>
        <small>Data Last Updated: 2021-03-14 19:13:51 UTC (block 12038505)</small>
      </i>
    </Content>
  );
};
