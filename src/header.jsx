import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header className="flex justify-between items-end bb-5 pv-1">
        <h1 className="ma2 f1-l f2-m f3">Bingo Buddies</h1>
        {this.props.children}
      </header>
    );
  }
}

export default Header;
