import React, { Component } from 'react';

class Header extends Component {
  render () {
    return (
      <div className="demo-header">
        <div className="demo-header--title"><a href="/">FlyAkeed Chat Window</a></div>
        <div className="demo-header--links">
          <a href="https://github.com/manuelist/akeed-care">Usage</a>
        </div>
      </div>
    );
  }
}

export default Header;
