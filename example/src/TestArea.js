import React, { Component } from 'react';

class TestArea extends Component {
  render () {
    return (
      <div className="demo-test-area--wrapper">
        <div className="demo-test-area--title">
          <div className="demo-test-area--title-main">AkeedCare Chat Window Demo</div>
        </div>
        <p className="demo-test-area--info">
          AkeedCare is a FlyAkeed Chat Tool to Communicate with the FlyAkeed Agent
          <br />
          <br/>
          Usage instructions for akeed-care are <a href="https://github.com/manuelist/akeed-care">on Github</a>.
        </p>
      </div>
    );
  }
}

export default TestArea;
