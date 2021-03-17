import React, {useEffect, useState} from 'react';
import {Input, Typography, Layout, Tabs, Card} from 'antd';
import {Table as AntTable, Popover} from 'antd';
import {Affix} from 'antd';

import './App.css';
import 'antd/dist/antd.css';

import {faq_title, faq_text} from './FAQ.js';
import {grantsData} from './grants-data.js';
import { columns } from './data-columns.js';
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
  return <AntTable pagination={pag} size='small' bordered={true} {...props} />;
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
                We are <Text type='warning'>permissionlessly not affilated</Text> with GitCoin
              </font>
            </small>
          </small>
        </Title>
      </Typography>
    </Header>
  );
};

export const LeftSider = () => {
  return (
    <Sider style={{paddingLeft: '20px', paddingRight: '20px'}}>
      <Paragraph style={{textDecoration: 'underline', fontWeight: 'bold', color: 'lightblue'}}>
        What is a data pouch?
      </Paragraph>
      <Text style={{color: 'lightblue'}}>
        A data pouch is a website that provides access to data files and nothing more. This data pouch was built using TrueBlocks.
      </Text>
      <br />
      <br />
      <br />
      <Paragraph style={{textDecoration: 'underline', fontWeight: 'bold', color: 'lightblue'}}>
        Ecosystem accounting
      </Paragraph>
      <Text style={{color: 'lightblue'}}>
        Permissionless, per-block, eighteen-decimal-place accurate, radically-transparent data accounting for
        communities and individuals.
      </Text>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <small>
        <Text style={{color: 'lightblue'}}>
          This website is <i>seriously alpha</i>, meaning we take no responsibility for the data provided.
        </Text>
      </small>
      <br />
      <br />
    </Sider>
  );
};

export const MyCard = ({children}) => {
  return (
    <Card
      style={{
        marginLeft: '4px',
        marginRight: '4px',
        marginBottom: '4px',
        border: '1px dotted gray',
        backgroundColor: 'antiquewhite',
      }}>
      {children}
    </Card>
  );
};

export const RightSider = () => {
  const hover1_text = (
    <ul style={{marginLeft: '-20px'}}>
      <li style={{textDecoration: 'line-through'}}>Enable search by name</li>
      <li>Update the data after every block</li>
      <li>
        Export all data (<div style={{display: 'inline', textDecoration: 'line-through'}}>appearances</div>, tx, trace, statements)
      </li>
      <li>
        Allow download of the entire data set as a <i>.tar.gz</i>
      </li>
    </ul>
  );
  const hover1_title = 'To Do List';
  return (
    <Sider style={{backgroundColor: 'lightblue'}}>
      <MyCard>
        <div style={{fontSize: '12pt', fontWeight: '800'}}>
          <a rel='noreferrer' target='_blank' href='http://gitcoin.co/grants/184/trueblocks'>
            Donate to the TrueBlocks Grant
          </a>
        </div>
      </MyCard>
      <MyCard>
        Wondering how this website works? Read about the <b>Unchained Index</b>{' '}
        <a rel='noreferrer' target='_blank' href='http://unchainedindex.io'>
          here
        </a>
      </MyCard>
      <MyCard>
        Interested in learning more?{' '}
        <a rel='noreferrer' target='_blank' href='https://discord.gg/RAz6DJ6xkf'>
          Join our discord discussions
        </a>
        .
      </MyCard>
      <MyCard>
        <Popover
          style={{border: '1px dashed black'}}
          color='lightblue'
          placement='left'
          title={hover1_title}
          content={hover1_text}
          trigger='hover'>
          <div style={{width: '100%', height: '100%'}}>
            To Do List
            <br />
            (on hover)
          </div>
        </Popover>
      </MyCard>
      <MyCard>
        <Popover
          style={{border: '1px dashed black'}}
          color='lightblue'
          placement='left'
          title={faq_title}
          content={faq_text}
          trigger='hover'>
          <div style={{width: '100%', height: '100%'}}>
            FAQ
            <br />
            (on hover)
          </div>
        </Popover>
      </MyCard>
    </Sider>
  );
};

export const HomePage = () => {
  const [searchText, setSearchText] = useState('');
  const [defKey, setDefKey] = useState(1);

  const onSearch = (value) => {
    setSearchText(value);
    console.log(value);
  };

  const contractData = grantsData.filter((item) => {
    return item.core && (searchText === '' || item.name.includes(searchText));
  });
  const grantData = grantsData.filter((item) => {
    return !item.core && (searchText === '' || item.name.includes(searchText));
  });
  useEffect(() => {
    setDefKey(!!contractData && contractData !== [] ? '1' : '2');
  }, [searchText, contractData]);

  /*<div>searchText: [ {searchText} ][{defKey}][{JSON.stringify(contractData, 2, null)}]</div>*/
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
        <TabPane tab='Donation Contracts' key='1' style={{paddingLeft: '8px'}}>
          <Table dataSource={contractData} columns={columns} />
        </TabPane>
        <TabPane tab='Individual Grants' key='2' style={{paddingLeft: '8px'}}>
          <Table dataSource={grantData} columns={columns} />
        </TabPane>
        <TabPane tab='Charts' key='3' style={{paddingLeft: '8px'}}>
          The future home of some charts
          <br />
          <img width='640px' alt='Count By Date' src='http://tokenomics.io/gitcoin/charts/Donation Count by Date.png' />
        </TabPane>
      </Tabs>
    </Content>
  );
};
