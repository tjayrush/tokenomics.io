import React from "react"

const toParagraph = (str, width) => {
  const words = str.split(' ');
  var ret = Array([]);
  for (var i = 0; i < words.length; i++) {
    ret.push_back(words[i])
  }
  return ret.join(' ');
}

const oneFAQ = (title, text) => {
  return (
    <li>
      <b>{title}</b>
      <br />
      <div>{text}</div>
    </li>
  );
}
export const faq_text = (
  <ul style={{marginLeft: '-20px'}}>
    <li>
      <b>What even is this website?</b>
      <br />
      <div>
        Access to the Gitcoin Grants data from two perspectives. First, from the perspective of the
        <br />
        smart contracts. The second is from the perspective of the individual grants. The website is an
        <br />
        experiment in monitoring and presenting the activity on a large collection of addresses in a fully
        <br />
        permissionless way that we call <i>ecosystem accounting</i>. This code runs on a desktop computer
        <br />
        with access to a node.
      </div>
    </li>
    <li>
      <b>May I download the entire data dump in a single file?</b>
      <br />
      <div>
        Currently no, but it's on our list of things to do.{' '}
        <a rel='noreferrer' target='_blank' href='http://github.com/TrueBlocks/tokenomics.io'>
          Dive in and help us
        </a>
        .
      </div>
    </li>
    <li>
      <b>What does your infrastructure look like? Are you running your own Ethereum nodes?</b>
      <br />
      <div>
        Currently, we run two OpenEthereum archive nodes in-house (switching to{' '}
        <a href='http://twitter.com/@turbogeth'>TurboGeth</a> soon).
        <br />
        Five years ago, we made a capital investment of about $5,000 for two "hefty" Linux computers.
        <br />
        Since them, we've upgraded twice to increase the hard-drive space (Raid 0, 12 TB, SSD). We
        <br />
        also pay about $30.00 US per month for this Digital Ocean server.
      </div>
    </li>
    <li>
      <b>Why do you only export event logs?</b>
      <br />
      <div>
        People are most familiar with logs, plus their analytical piplines already handle that type of data.
        <br />
        The full suite of TrueBlocks tools produces much more data, though. Full tranactional details,
        <br />
        full tracing data, and even full ETH accounting are available, but we do not include that data on
        <br />
        this website at this time.
      </div>
    </li>
    <li>
      <b>What's hard about what you did?</b>
      <br />
      <ul style={{marginLeft: '-20px'}}>
        <li>The data comes directly from an Ethereum node.</li>
        <li>
          Without TrueBlocks, getting this same data{' '}
          <i>
            <u>from a node</u>
          </i>{' '}
          takes WEEKS!
        </li>
        <li>TrueBlocks core runs on our Mac desktop using zero third-party APIs.</li>
        <li>There are no databases to install or maintain. Local-first baby.</li>
        <li>Perfect privacy. We ask no-one's permission, get no API keys, complete no logins.</li>
      </ul>
    </li>
    <li>
      <b>Why did you build the data pouch?</b>
      <br />
      <div>
        Five years ago we fell in love with the idea of per-block, 18-decimal-place-accurate
        <br />
        permissionless, radically-transparent balance sheets and profit-and-loss statements. At
        <br />
        TrueBlocks, we are trying to build on that dream. Recently, we've expanded the idea
        <br />
        into something we call <i>ecosystem accounting</i> which means accounting for community-wide
        <br />
        constellations of inter-related Ethereum addresses such as the GitCoin grant community.
      </div>
    </li>
  </ul>
);

export const faq_title = 'FAQ';
