export const columns = [
  {
    title: 'Last Update',
    dataIndex: 'date',
    key: 'date',
    width: '10%',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    width: '5%',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    width: '20%',
    render: (text, record) => (
      <a target={'top'} href={'http://etherscan.io/address/' + text}>
        {text}
      </a>
    ),
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: '30%',
    render: (text, record) => {
      return (
        <a target={'top'} href={'http://gitcoin.co/grants/' + text}>
          {text}
        </a>
      )
    },
  },
  {
    title: 'nRecords',
    dataIndex: 'cnt',
    key: 'cnt',
    width: '5%',
  },
  {
    title: 'Download CSV',
    dataIndex: 'csv',
    key: 'csv',
  },
  {
    title: 'Download JSON',
    dataIndex: 'json',
    key: 'json',
  },
];
