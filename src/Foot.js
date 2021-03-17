import React from 'react';
import { Layout } from 'antd';
import {TwitterOutlined, GithubOutlined, MailOutlined} from '@ant-design/icons';

import './App.css';
import 'antd/dist/antd.css';
const {Footer} = Layout;

export const Foot = () => {
  return (
    <Footer>
      <div style={{height: '10px', fontSize: '8pt', display: 'grid', gridTemplateColumns: '1fr 10fr 1fr'}}>
        <div style={{textAlign: 'left'}}></div>
        <div>
          A project of TrueBlocks, LLC &diams; Powered by <a href='https://twitter.com/trueblocks'>@trueblocks</a> and{' '}
          <a href='http://tokenomics.io'>tokenomics.io</a>
        </div>
        <div style={{textAlign: 'right'}}>
          <a rel='noreferrer' target='_blank' href='http://twitter.com/@trueblocks'>
            <TwitterOutlined style={{fontSize: '14pt', color: '#282c34'}} />
          </a>
          {'  '}
          <a rel='noreferrer' target='_blank' href='https://github.com/TrueBlocks/tokenomics.io'>
            <GithubOutlined style={{fontSize: '14pt', color: '#282c34'}} />
          </a>
          {'  '}
          <a rel='noreferrer' target='_blank' href='mailto:info@trueblocks.io'>
            <MailOutlined style={{fontSize: '14pt', color: '#282c34'}} />
          </a>{' '}
        </div>
      </div>
    </Footer>
  );
};
