import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

class Instructions extends Component {

  render() {
    return (
      <div>
        <h2>Instructions</h2>
        <ReactMarkdown source={this.props.src}/>
      </div>
    );
  }

}

export default Instructions;