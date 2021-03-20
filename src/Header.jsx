import React from 'react';
import {Typography, Layout} from 'antd';

import './App.css';
import 'antd/dist/antd.css';

const { Header } = Layout;
const { Title, Text } = Typography;

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
