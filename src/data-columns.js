import {DownloadOutlined} from '@ant-design/icons';

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
    width: '6%',
    filters: [
      {text: 'Transactions', value: 'txs'},
      {text: 'Logs', value: 'logs'},
      {text: 'Traces', value: 'traces'},
    ],
    onFilter: (value, record) => record.type.includes(value),
    render: (text) => (
      <pre>
        <small>{text}</small>
      </pre>
    ),
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    width: '25%',
    render: (text) => (
      <pre>
        <a target={'top'} href={'http://etherscan.io/address/' + text}>
          <small>{text}</small>
        </a>
      </pre>
    ),
    sorter: {
      compare: (a, b) => {
        return a.address - b.address;
      },
      multiple: 3,
    },
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: '30%',
    render: function (text, record) {
      var name = !!record.grant_id ? record.name + ' (#' + record.grant_id + ')' : record.name;
      if (!record.slug)
        return (
          <pre>
            <small>{name}</small>
          </pre>
        );
      return (
        <pre>
          <a target={'top'} href={record.slug}>
            <small>{name}</small>
          </a>
        </pre>
      );
    },
    sorter: {
      compare: (a, b) => a.name - b.name,
      multiple: 3,
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
      },
      multiple: 3,
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
      },
      multiple: 3,
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
      },
      multiple: 3,
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
      },
      multiple: 3,
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
