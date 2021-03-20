import React from 'react';
import {Typography, Layout} from 'antd';

import './App.css';
import 'antd/dist/antd.css';

const { Header } = Layout;
const { Title, Text } = Typography;

export const Head = () => {
  return (
    <Header style={{height: '100px'}}>
      <div style={{display: 'grid', gridTemplateColumns: '2fr 10fr 2fr'}}>
        <div></div>
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
        <div style={{textAlign: 'right'}}>
          <a rel='noreferrer' target='_blank' href='https://discord.gg/RAz6DJ6xkf'>
            <Text style={{color: 'lightblue', textDecoration: 'underline'}}>like to help?</Text>
          </a>
        </div>
      </div>
    </Header>
  );
};
