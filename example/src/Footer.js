import React, { Component } from 'react';

class Footer extends Component {
  render () {
    return (
      <div className="demo-footer">
        <div>
          <div>Copyright {new Date().getFullYear()}. FlyAkeed Inc</div>
          <div>All rights reserved</div>
        </div>
      </div>
    );
  }
}

export default Footer;
