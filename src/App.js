import React, { Component } from 'react';
import './tachyons.css';
import Board from './board';

class App extends Component {
  render() {
    return (
      <div className='app'>
        <Board id='abc' size={5} values={'abcdefghijklmnopqrstuvwxyz'.split('')}/>
        <button className='f6 link dim br3 ba bw1 ph3 pv2 mb2 dib near-black'>
          Refresh
        </button>
      </div>
    );
  }
}

export default App;
