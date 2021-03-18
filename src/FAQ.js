import React from "react"

const fq1 = 'What is this website?';
const fa1 = (
  <div>
    {`This websites gives ccess to on-chain Gitcoin Grant data from two perspectives. First, from the perspective
    of the smart contracts. And second from the perspective of each individual grant. The website is an experiment
    in monitoring and presenting chain data for a large collection of related addresses in a fully permissionless
    way. The code is open source and runs locally on desktop computers. The low cost and fully local aspect of the
    tools enables us to provide this data for free.`}
  </div>
);

const fq2 = 'May I download the entire data set in a single file?';
const fa2 = (
  <div>
    {`Not exactly, but you may download all logs from each smart contract on the `}<i>{`Dontations Contracts`}</i>{` tab.`}
  </div>
);

const fq3 = 'What does your infrastructure look like? Are you running your own Ethereum nodes?';
const fa3 = (
  <div>
    {`Currently, we run two OpenEthereum archive nodes in-house (we are switching to `}
    <a href='http://twitter.com/@turbogeth'>TurboGeth</a>{` soon). Five years ago, we
    made spent about $5,000 for two "hefty" Linux computers. Since then, we've upgraded
    twice to increase the hard-drive space (Raid 0, 12 TB, SSD). We also pay about $30.00
    US per month for this Digital Ocean server.`}
  </div>
);

const fq4 = 'Why do you only export event logs?';
const fa4 = (
  <div>
    {`More is coming soon. We started with logs because people are most familiar with logs, plus their
    analytical piplines already handle that type of data. The full suite of TrueBlocks tools produces much
    more data than that. Full tranactional details, full tracing data, and even full ETH accounting are available,
    however we do not yet include that data on this website.`}
  </div>
);

const fq5 = 'What\'s hard about what you did?';
const fa5 = (
  <ul style={{marginLeft: '-20px'}}>
    <li>The data comes directly from an Ethereum node.</li>
    <li>
      Without TrueBlocks, getting this same data{' '}
      <i>
        <u>from a node</u>
      </i>{' '}
      takes WEEKS!
    </li>
    <li>TrueBlocks core runs on our Mac desktop using absolutly no third-party APIs.</li>
    <li>There are no databases to install or maintain. It runs local-first and is very cheap to run.</li>
    <li>What we've built is perfect privacy. We ask no-one's permission, nor do we need API keys, nor do we every login anywhere.</li>
  </ul>
);

const fq6 = 'Why did you build the data pouch?';
const fa6 = (
  <div>
    {`Five years ago we fell in love with the idea of per-block, 18-decimal-place-accurate, permissionless,
    radically-transparent data. We've been trying to build on that dream ever since. Recently, we've
    expanded the idea into `}<i>ecosystem accounting</i>{` which means accounting for community-wide
    constellations of inter-related Ethereum addresses such as the GitCoin grant community.`}
  </div>
);

const FaqEntry = ({ question, answer }) => {
  return (
    <li>
      <b>{question}</b>
      <br />
      <div style={{width: '650px', wordWrap: 'break-word', paddingBottom: "10px"}}>{answer}</div>
    </li>
  );
};

export const faq_text = (
  <ul style={{marginLeft: '-20px'}}>
    <FaqEntry question={fq1} answer={fa1} />
    <FaqEntry question={fq2} answer={fa2} />
    <FaqEntry question={fq3} answer={fa3} />
    <FaqEntry question={fq4} answer={fa4} />
    <FaqEntry question={fq5} answer={fa5} />
    <FaqEntry question={fq6} answer={fa6} />
  </ul>
);

export const faq_title = 'FAQ';
