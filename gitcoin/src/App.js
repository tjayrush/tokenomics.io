import {Typography, Layout, Table} from 'antd';
import './App.css';
import 'antd/dist/antd.css';
import {dataSource, columns} from './data.js'

const {Header, Footer, Sider, Content} = Layout;
const {Title, Paragraph, Text} = Typography;

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
          <Content style={{padding: '10px', paddingLeft: '15px', backgroundColor: 'lightblue'}}>
            <Layout>
              <Content>
                <Table
                  style={{border: '1px dotted gray', padding: '2px'}}
                  bordered={true}
                  dataSource={dataSource}
                  columns={columns}
                />
              </Content>
              <Sider style={{backgroundColor: 'lightblue'}}>Content 2</Sider>
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

