import React from "react"

export const faq_text = (
  <ul style={{marginLeft: '-20px'}}>
    <li>
      <b>May I download the entire data dump in a single file?</b>
      <br />
      <div>Currently no, but it's on our list of things to do. Dive in and help us there.</div>
    </li>
    <li>
      <b>What does your infrastructure look like? Are you running your own Ethereum nodes?</b>
      <br />
      <div>
            We currently run two OpenEthereum archive nodes in house (soon to be <a href="http://twitter.com/@turbogeth">TurboGeth</a>).<br />
            About four years ago, we made a capital investment of about $2,500 and<br />
            have upgrade twice to increase the available hard drive space (Raid 0, 12 TB currently)<br />
            We also pay about $30.00 US per month for a Digital Ocean server.
      </div>
    </li>
    <li>
      <b>Why do you only export logs?</b>
      <br />
        <div>People are most familiar with logs. People's analytical piplines are already able to handle<br />
        logs. Also -- that's as far as we've gotten. Stay tuned.</div>
    </li>
    <li>
      <b>Are other data such as tracing data and accounting available?</b>
      <br />
        <div>
            Currently, no. In the future, probably. Our tools already are able to produce<br />
            trace data, log data, transactional data, accounting data, and other data.<br />
            Our website does not yet deliver that data. We're debating whether it should.
        </div>
    </li>
    <li>
      <b>Why are you building this?</b>
      <br />
        <div>
            Five years ago we fell in love with the idea of every-block, 18-decimal-place accurate<br />
            permissionless, radically-transparent balance sheets and profit-and-loss statements. Before<br />
            TrueBlocks, this was only a dream. We're trying to build that dream. We've since expanded the<br />
            idea into something we call <i>Ecosystem Accounting</i> which means accounting for large ecosystems<br />
            of inter-related addresses such as the GitCoin grant community. This is our first effort to realize<br />
            that dream. Help us!
        </div>
    </li>
  </ul>
);

export const faq_title = 'FAQ';
