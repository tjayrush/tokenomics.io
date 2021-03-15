import React, { Fragment } from 'react';
import {Typography, Layout, Tabs, Card} from 'antd';
import {Table as AntTable} from 'antd';
import {Affix} from 'antd';

import './App.css';
import 'antd/dist/antd.css';

import {grantsData} from './grants-data.js';
import {contractData} from './contract-data.js';
import {columns} from './data-columns.js';

const {Header, Footer, Sider, Content} = Layout;
const {Title, Paragraph, Text} = Typography;
const {TabPane} = Tabs;
const Table = (props) => {
  return <AntTable {...props} />;
};

var homePage = true;

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
            {homePage ? <HomePage /> : <FAQ/>}
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

export const Foot = () => {
  return (
    <Footer style={{height: '10px', fontSize: '8pt'}}>
      A project of TrueBlocks, LLC &diams; Powered by <a href='https://twitter.com/trueblocks'>@trueblocks</a> and{' '}
      <a href='http://tokenomics.io'>tokenomics.io</a>
    </Footer>
  );
};

export const LeftSider = () => {
  return (
    <Sider style={{paddingLeft: '20px', paddingRight: '20px'}}>
      <Paragraph style={{textDecoration: 'underline', fontWeight: 'bold', color: 'lightblue'}}>
        What is a data pouch?
      </Paragraph>
      <Text style={{color: 'lightblue'}}>
        A data pouch is a website that provides access to data files and nothing more
      </Text>
      <br />
      <br />
      <br />
      <Paragraph style={{textDecoration: 'underline', fontWeight: 'bold', color: 'lightblue'}}>
        Ecosystem accounting
      </Paragraph>
      <Text style={{color: 'lightblue'}}>
        Per-block, eighteen-decimal-place accurate, permissionless, radically-transparent accounting on large collections of addresses.
      </Text>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Paragraph type='warning'>Note:</Paragraph>
      <Text style={{color: 'lightblue'}}>
        This website is not only <i>alpha</i> it is <i>seriously alpha</i>. This means we take no responsibility for the
        data provided.
      </Text>
    </Sider>
  );
};

export const RightSider = () => {
  return (
    <Sider style={{backgroundColor: 'lightblue'}}>
      <Card
        style={{
          marginLeft: '4px',
          marginRight: '4px',
          marginBottom: '4px',
          border: '1px dotted gray',
          backgroundColor: 'antiquewhite',
        }}>
        <div style={{fontSize: '12pt', fontWeight: '800'}}>
          <a rel='noreferrer' target='_blank' href='http://gitcoin.co/grants/184/trueblocks'>
            Donate to the TrueBlocks Grant
          </a>
        </div>
      </Card>
      <Card
        style={{
          marginLeft: '4px',
          marginRight: '4px',
          marginBottom: '4px',
          border: '1px dotted gray',
          backgroundColor: 'antiquewhite',
        }}>
        Wondering how this website works? Read about the <b>Unchained Index</b>{' '}
        <a rel='noreferrer' target='_blank' href='http://unchainedindex.io'>
          here
        </a>
      </Card>
      <Card
        style={{
          marginLeft: '4px',
          marginRight: '4px',
          marginBottom: '4px',
          border: '1px dotted gray',
          backgroundColor: 'antiquewhite',
        }}>
        Interested in learning more?{' '}
        <a rel='noreferrer' target='_blank' href='https://discord.gg/RAz6DJ6xkf'>
          Join our discord discussions
        </a>.
      </Card>
      <Card
        style={{
          marginLeft: '4px',
          marginRight: '4px',
          marginBottom: '4px',
          border: '1px dotted gray',
          backgroundColor: 'antiquewhite',
        }}>
        FAQ
      </Card>
    </Sider>
  );
};

export const HomePage = () => {
  return (
    <Content>
      <Tabs defaultActiveKey='1' onChange={callback} style={{border: '1px dotted gray', padding: '4px'}}>
        <TabPane tab='Individual Grants' key='1' style={{paddingLeft: '8px'}}>
          <Table bordered={true} dataSource={grantsData} columns={columns} />
        </TabPane>
        <TabPane tab='Smart Contracts' key='2' style={{paddingLeft: '8px'}}>
          <Table bordered={true} dataSource={contractData} columns={columns} />
        </TabPane>
      </Tabs>
    </Content>
  );
};

export const FAQ = () => {
const faq_columns = [
  {
    title: 'Question',
    dataIndex: 'question',
    key: 'question',
    width: "20%"
  },
  {
    title: 'Answer',
    dataIndex: 'answer',
    key: 'answer',
  },
];

  const faqs = [
    {
      key: 1,
      question: 'What the fuck is going on with you?',
      answer: "Not much how about you?"
    },
    {
      key: 2,
      question: 'Will you ever actually release software?',
      answer: "Probably not."
    },
    {
      key: 2,
      question: 'Do you realize how amazing this is?',
      answer: "Yes."
    }
  ];

  return (
    <Content>
      <Title align="left" level={2} style={{paddingLeft: "10px"}}>FAQ</Title>
      <Table pagination={false} bordered={true} dataSource={faqs} columns={faq_columns} />
    </Content>
  );
};
