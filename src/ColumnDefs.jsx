import {Popover, Tag, Typography} from 'antd';
import {DownloadOutlined} from '@ant-design/icons';
const {Text} = Typography;

const widths = {
  date: '15%',
  type: '8%',
  name: '21%',
  matched: '6%',
  claimed: '6%',
  balance: '6%',
  tx_cnt: '8%',
  log_cnt: '8%',
};

const blk = (block) => {
  console.log('block: ' + block);
  if (block === '0')
    return '';
  return ('(block: ' + block + ')');
}
const ColumnTitle = ({title, tooltip}) => {
  return (
    <div>
      {title}{' '}
      <Popover
        color='lightblue'
        content={
          <div style={{width: '200px', wordWrap: 'break-word'}}>
            {tooltip}
          </div>
        }>
        <Text style={{fontWeight: '800', color: '#006666'}}>?</Text>
      </Popover>
    </div>
  );
}
export const columns = [
  {
    title: (
      <div>
        Last Activity{' '}
        <Popover
          color='lightblue'
          content={
            <div>
              The most recent interaction this address
              <br />
              had with a GitCoin-related contract.
            </div>
          }>
          <Text style={{fontWeight: '800', color: '#006666'}}>?</Text>
        </Popover>
      </div>
    ),
    dataIndex: 'date',
    key: 'date',
    width: widths['date'],
    render: (text, record) => {
      const dd = (
        <div>
          {text}
          <div>
            <small>
              <i>
                {/*(round: {record.last_ts} block: {record.last_block})*/}
                {blk(record.last_block)}
              </i>
            </small>
          </div>
        </div>
      );
      return renderCell(dd);
    },
    showSorterTooltip: false,
    sorter: {
      compare: (a, b) => a.last_block - b.last_block,
    },
  },
  {
    title: (
      <div>
        Type{' '}
        <Popover
          color='lightblue'
          content={
            <div>
              The type of data to download. Currently,
              <br />
              only logs, but coming soon txs,
              <br />
              traces, accounting, etc.
            </div>
          }>
          <Text style={{fontWeight: '800', color: '#006666'}}>?</Text>
        </Popover>
      </div>
    ),
    dataIndex: 'type',
    key: 'type',
    width: widths['type'],
    filters: [
      {text: 'Transactions', value: 'txs'},
      {text: 'Logs', value: 'logs'},
      {text: 'Traces', value: 'traces'},
    ],
    onFilter: (value, record) => record.type.includes(value),
    render: (text, record) => (
      <div style={{marginTop: '-25px'}}>
        <pre>
          <br />
          <Tag color='blue' key={record.address}>
            <small>{text}</small>
          </Tag>
        </pre>{' '}
        <br />
        <br />
      </div>
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
              either to the GitCoin grant or Etherscan.
            </div>
          }>
          <Text style={{fontWeight: '800', color: '#006666'}}>?</Text>
        </Popover>
      </div>
    ),
    dataIndex: 'name',
    key: 'name',
    width: widths['name'],
    render: function (text, record) {
      var name = !!record.grant_id ? record.name + ' (#' + record.grant_id + ')' : record.name;
      name = name.replace('&#39;', "'");
      if (!record.slug)
        return (
          <pre>
            <small>{name}</small>
            <br />
            <a target={'top'} href={'http://etherscan.io/address/' + record.address}>
              <small>{record.address}</small>
            </a>
            <br />
            <br />
          </pre>
        );
      return (
        <div>
          <pre>
            <a target={'top'} href={record.slug}>
              <small>{name}</small>
            </a>
            <br />
            <a target={'top'} href={'http://etherscan.io/address/' + record.address}>
              <small>{record.address}</small>
            </a>
          </pre>
          <br />
        </div>
      );
    },
    showSorterTooltip: false,
    sorter: {
      compare: (a, b) => a.address - b.address,
    },
  },
  {
    title: <ColumnTitle title='CLR' tooltip='The match, claimed, and unclaimed amounts for the grant from Round 8.' />,
    dataIndex: 'matched',
    key: 'matched',
    align: 'right',
    width: widths['matched'],
    render: (text, record) => {
      var unclaimed = (record.matched - record.claimed) + ' DAI';
      if (record.matched - record.claimed > 0)
        unclaimed = <div style={{border: '1px dashed orange'}}>{unclaimed}</div>;
      const tt = (
        <div>
          <div>{record.matched + ' DAI'}</div>
          <div>{record.claimed + ' DAI'}</div>
          <div>{unclaimed}</div>
        </div>
      );
      return renderCell2(tt);
    },
    showSorterTooltip: false,
    sorter: {
      compare: function (a, b) {
        const unclaimedA = a.matched - a.claimed;
        const unclaimedB = b.matched - b.claimed;
        return unclaimedA - unclaimedB;
      },
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
              in ETH. We're adding DAI and
              <br />
              other tokens later.
            </div>
          }>
          <Text style={{fontWeight: '800', color: '#006666'}}>?</Text>
        </Popover>
      </div>
    ),
    dataIndex: 'balance',
    key: 'balance',
    align: 'right',
    width: widths['balance'],
    render: (text, record) => {
      return renderCell(record.balances[0].balance + ' ETH');
    },
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
        Appearances{' '}
        <Popover
          color='lightblue'
          content={
            <div>
              The total number of appearances for
              <br />
              this address. (An appearance is any
              <br />
              transaction the account has ever
              <br />
              appeared in including internal txs.)
            </div>
          }>
          <Text style={{fontWeight: '800', color: '#006666'}}>?</Text>
        </Popover>
      </div>
    ),
    dataIndex: 'tx_cnt',
    key: 'tx_cnt',
    width: widths['tx_cnt'],
    align: 'right',
    showSorterTooltip: false,
    sorter: {
      compare: (a, b) => {
        return a.tx_cnt - b.tx_cnt;
      },
    },
    render: function (text, record) {
      return downloadLink(record, 'apps/', 'txt');
    },
  },
  {
    title: (
      <div>
        Event Logs{' '}
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
    dataIndex: 'log_cnt',
    key: 'log_cnt',
    width: widths['log_cnt'],
    align: 'right',
    showSorterTooltip: false,
    sorter: {
      compare: (a, b) => {
        return a.log_cnt - b.log_cnt;
      },
    },
    render: function (text, record) {
      return downloadLink(record, '', 'csv');
    },
  },
];

function downloadLink(record, extra, type) {
  if (extra !== '') {
    return (
      <div style={{display: 'grid', gridTemplateColumns: '1fr'}}>
        <pre style={{margin: '0px'}}>
          <small>({record.tx_cnt})</small>
          <br />
          <small>
            <a target={'blank'} href={'http://tokenomics.io/gitcoin/data/' + extra + record.address + '.' + type}>
              <DownloadOutlined /> {type}
            </a>
          </small>
          <br />
          <br />
        </pre>
      </div>
    );
  }

  return (
    <div style={{display: 'grid', gridTemplateColumns: '1fr'}}>
      <pre style={{margin: '0px'}}>
        <small>({record.log_cnt})</small>
        <br />
        <small>
          <a target={'blank'} href={'http://tokenomics.io/gitcoin/data/' + extra + record.address + '.' + type}>
            <DownloadOutlined /> {type}{' '}
          </a>
          <br />
          <a target={'blank'} href={'http://tokenomics.io/gitcoin/data/' + extra + record.address + '.json'}>
            <DownloadOutlined /> json
          </a>
        </small>
      </pre>
    </div>
  );
}

const renderCell = (text) => {
  return (
    <div>
      <pre>
        <small>{text}</small>
      </pre>
      <br />
      <br />
    </div>
  );
};

const renderCell2 = (text) => {
  return (
    <div>
      <pre>
        <small>{text}</small>
      </pre>
    </div>
  );
};
