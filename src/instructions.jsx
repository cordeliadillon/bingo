import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

class Instructions extends Component {

  renderDefault() {
    return (
      <div>
        <h3>The Basics</h3>
        <ul>
          <li>Press tiles as phrases come up.</li>
          <li>Your game timer begins as soon as you start a new board.</li>
          <li><strong>5 in a row is bingo!</strong></li>
        </ul>
      </div>
    );
  }

  render() {
    return (
      <aside className='maxw-95 instructions' aria-label="Instructions">
        <h2 className="pv2 bb-3">Instructions</h2>
        {this.props.src ? <ReactMarkdown source={this.props.src}/> : this.renderDefault()}
      </aside>
    );
  }

}

export default Instructions;