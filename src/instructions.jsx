import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

class Instructions extends Component {

  render() {
    return (
      <aside className='maxw-95 instructions' aria-label="Instructions">
        <h2 className="pv2 bb-3">Instructions</h2>
        <ReactMarkdown source={this.props.src}/>
      </aside>
    );
  }

}

export default Instructions;