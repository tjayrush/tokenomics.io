import { Popover, Tag, Typography } from 'antd';
import {DownloadOutlined} from '@ant-design/icons';
const { Text} = Typography;

export const columns = [
  {
    title: 'Last Update',
    dataIndex: 'date',
    key: 'date',
    width: '15%',
    render: (text) => (
      <pre>
        <small>{text}</small>
      </pre>
    ),
  },
  {
    title: (
      <div>
        Type{' '}
        <Popover
          color='lightblue'
          content={
            <div>
              The type of data to download. One
              <br />
              of txs, logs, traces, or accounting.
            </div>
          }>
          <Text style={{fontWeight: '800', color: '#006666'}}>?</Text>
        </Popover>
      </div>
    ),
    dataIndex: 'type',
    key: 'type',
    width: '8%',
    filters: [
      {text: 'Transactions', value: 'txs'},
      {text: 'Logs', value: 'logs'},
      {text: 'Traces', value: 'traces'},
    ],
    onFilter: (value, record) => record.type.includes(value),
    render: (text, record) => (
      <pre>
        <Tag color='blue' key={record.address}>
          <small>{text}</small>
        </Tag>
      </pre>
    ),
  },
  {
    title: (
      <div>
        Name{' '}
        <Popover
          color='lightblue'
          content={
            <div>
              The name and address of the
              <br />
              grant or core contract linked
              <br />
              either to the grant or Etherscan.
            </div>
          }>
          <Text style={{fontWeight: '800', color: '#006666'}}>?</Text>
        </Popover>
      </div>
    ),
    dataIndex: 'name',
    key: 'name',
    width: '30%',
    render: function (text, record) {
      var name = !!record.grant_id ? record.name + ' (#' + record.grant_id + ')' : record.name;
      name = name.replace('&#39;', "'");
      if (!record.slug)
        return (
          <pre>
            <small>{name}</small>
            <br />
            <a target={'top'} href={'http://etherscan.io/address/' + text}>
              <small>{record.address}</small>
            </a>
          </pre>
        );
      return (
        <pre>
          <a target={'top'} href={record.slug}>
            <small>{name}</small>
          </a>
          <br />
          <a target={'top'} href={'http://etherscan.io/address/' + record.address}>
            <small>{record.address}</small>
          </a>
        </pre>
      );
    },
    showSorterTooltip: false,
    sorter: {
      compare: (a, b) => a.address - b.address,
    },
  },
  {
    title: (
      <div>
        Balances{' '}
        <Popover
          color='lightblue'
          content={
            <div>
              The balances for the account
              <br />
              in ETH and possibly DAI. Hover
              <br />
              to see other balances.
            </div>
          }>
          <Text style={{fontWeight: '800', color: '#006666'}}>?</Text>
        </Popover>
      </div>
    ),
    dataIndex: 'balance',
    key: 'balance',
    align: 'right',
    width: '10%',
    render: (text, record) => (
      <pre>
        <small>{record.balances[0].balance}</small>
      </pre>
    ),
    showSorterTooltip: false,
    sorter: {
      compare: function (a, b) {
        return a.balances[0].balance - b.balances[0].balance;
      },
    },
  },
  {
    title: (
      <div>
        Txs{' '}
        <Popover
          color='lightblue'
          content={
            <div>
              The total number of appearances for
              <br />
              this address. (An appearance is any
              <br />
              transaction the account was appeared in.
            </div>
          }>
          <Text style={{fontWeight: '800', color: '#006666'}}>?</Text>
        </Popover>
      </div>
    ),
    dataIndex: 'tx_cnt',
    key: 'tx_cnt',
    width: '4%',
    align: 'right',
    showSorterTooltip: false,
    sorter: {
      compare: (a, b) => {
        return a.tx_cnt - b.tx_cnt;
      },
    },
    render: (text) => (
      <pre>
        <small>{text}</small>
      </pre>
    ),
  },
  {
    title: (
      <div>
        Logs{' '}
        <Popover
          color='lightblue'
          content={
            <div>
              The number of GitCoin related logs
              <br />
              in which this address appears.
            </div>
          }>
          <Text style={{fontWeight: '800', color: '#006666'}}>?</Text>
        </Popover>
      </div>
    ),
    dataIndex: 'donation_cnt',
    key: 'donation_cnt',
    width: '4%',
    align: 'right',
    showSorterTooltip: false,
    sorter: {
      compare: (a, b) => {
        return a.donation_cnt - b.donation_cnt;
      },
    },
    render: (text) => (
      <pre>
        <small>{text}</small>
      </pre>
    ),
  },
  {
    title: 'CSV',
    dataIndex: 'csv',
    key: 'csv',
    width: '5%',
    render: function (text, record) {
      return downloadLink(record, '.csv');
    },
  },
  {
    title: 'JSON',
    dataIndex: 'json',
    key: 'json',
    width: '5%',
    render: function (text, record) {
      return downloadLink(record, '.json');
    },
  },
];

function downloadLink(record, type) {
  if (record.tx_cnt === 0 && record.log_cnt === 0) {
    return (
      <div>
        <pre>
          <div>
            <small>{'<no-data>'}</small>
          </div>
        </pre>
      </div>
    );
  }

  return (
    <div>
      <a target={'blank'} href={'http://tokenomics.io/data/' + record.address + type}>
        <pre>
          <DownloadOutlined /> <small>Download</small>
        </pre>
      </a>
    </div>
  );
}
