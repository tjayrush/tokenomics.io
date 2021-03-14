import {Typography, Layout, Table, Tabs, Card} from 'antd';
import './App.css';
import 'antd/dist/antd.css';
import {grantsData} from './grants-data.js';
import {contractData} from './contract-data.js';
import {columns} from './data-columns.js';

const {Header, Footer, Sider, Content} = Layout;
const {Title, Paragraph, Text} = Typography;
const {TabPane} = Tabs;

function callback(key) {
  console.log(key);
}

function App() {
  return (
    <div className='App'>
      <Layout>
        <Header style={{height: '130px'}}>
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
        <Layout>
          <Sider style={{paddingLeft: '20px', paddingRight: '20px'}}>
            <Paragraph style={{fontSize: '14pt', fontWeight: 'bold', color: 'lightblue'}}>
              What is a data pouch?
            </Paragraph>
            <Text style={{color: 'lightblue'}}>
              A data pouch is a website that provides access to data files and nothing more
            </Text>
          </Sider>
          <Content style={{padding: '10px', paddingLeft: '10px', backgroundColor: 'lightblue'}}>
            <Layout>
              <Content>
                <Tabs defaultActiveKey='1' onChange={callback} style={{border: '1px dotted gray', padding: '4px'}}>
                  <TabPane tab='Donations Contract' key='2' style={{paddingLeft: '8px'}}>
                    <Table bordered={true} dataSource={contractData} columns={columns} />
                  </TabPane>
                  <TabPane tab='Individual Grants' key='1' style={{paddingLeft: '8px'}}>
                    <Table bordered={true} dataSource={grantsData} columns={columns} />
                  </TabPane>
                </Tabs>
              </Content>
              <Sider style={{backgroundColor: 'lightblue'}}>
                <Card style={{marginLeft: '4px', marginRight: '4px'}}>
                  This is some additional information stored in a card
                </Card>
              </Sider>
            </Layout>
          </Content>
        </Layout>
        <Footer>
          Powered By <a href='https://twitter.com/trueblocks'>@trueblocks</a>
        </Footer>
      </Layout>{' '}
    </div>
  );
}

export default App;

