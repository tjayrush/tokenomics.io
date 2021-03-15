import { Tag } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

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
    title: 'Type',
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
    title: 'Name',
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
    sorter: {
      compare: (a, b) => a.address - b.address
    },
  },
  {
    title: 'Balances',
    dataIndex: 'balance',
    key: 'balance',
    align: 'right',
    width: '10%',
    render: (text, record) => (
      <pre>
        <small>{record.bals[0].balance}</small>
      </pre>
    ),
    sorter: {
      compare: function (a, b) {
        return a.bals[0].balance - b.bals[0].balance;
      }
    },
  },
  {
    title: 'Txs',
    dataIndex: 'tx_cnt',
    key: 'tx_cnt',
    width: '4%',
    align: 'right',
    sorter: {
      compare: (a, b) => {
        return a.tx_cnt - b.tx_cnt;
      }
    },
    render: (text) => (
      <pre>
        <small>{text}</small>
      </pre>
    ),
  },
  {
    title: 'Logs',
    dataIndex: 'log_cnt',
    key: 'log_cnt',
    width: '4%',
    align: 'right',
    sorter: {
      compare: (a, b) => {
        return a.log_cnt - b.log_cnt;
      }
    },
    render: (text) => (
      <pre>
        <small>{text}</small>
      </pre>
    ),
  },
  {
    title: 'Count',
    dataIndex: 'donation_cnt',
    key: 'donation_cnt',
    width: '4%',
    align: 'right',
    sorter: {
      compare: (a, b) => {
        return a.donation_cnt - b.donation_cnt;
      }
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
