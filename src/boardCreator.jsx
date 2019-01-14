import React, { Component } from 'react';
import validator from 'validator';

const EMPTY = 0;
const INVALID = 1;

class BoardCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      range: 5,
      boardNameError: EMPTY,
      lexiconError: INVALID
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    const id = e.target.querySelector('#boardName').value;
    const lexicon = e.target.querySelector('#lexicon').value;
    console.log(lexicon, validator.escape(lexicon));
    // debugger;
    console.log(id, lexicon);
    e.preventDefault();
  }

  renderBoardNameError() {
    switch (this.state.boardNameError) {
      case EMPTY:
        return (
          <span className='db f6 mb2 darker-red' id='boardName-error'>
            <strong>Whoops!</strong> You must specify a board name.
          </span>
        );
      case INVALID:
        return (
          <span className='db f6 mb2 darker-red' id='boardName-error'>
            <strong>Whoops!</strong> Board name can only contain letters and numbers.
          </span>
        );
      default:
        return (<span className='db f6 mb2 darker-red' id='boardName-error'></span>);
    }
  }

  renderBoardSizeError() {
    if (this.state.boardSizeError === INVALID) {
      return (
        <span className='db f6 mb2 darker-red' id='boardSize-error'>
          <strong>Whoops!</strong> Board size must be an odd number from 3 to 15.
        </span>
      );
    }

    return (<span className='db f6 mb2 darker-red' id='boardSize-error'></span>);
  }

  renderLexiconError() {
    switch (this.state.lexiconError) {
      case EMPTY:
        return (
          <span className='db f6 mb2 darker-red' id='lexicon-error'>
            <strong>Whoops!</strong> You must specify at least 1 phrase.
          </span>
        );
      case INVALID:
        return (
          <span className='db f6 mb2 darker-red' id='lexicon-error'>
            <strong>Whoops!</strong> Entries can only contain letters, numbers, spaces, and the following characters: <strong>. ! ? - ' " & , :</strong>
          </span>
        );
      default:
        return (<span className='db f6 mb2 darker-red' id='lexicon-error'></span>);
    }
  }

  render() {
    return (
      <div>
        So you want to create a bingo board!
        <form className='pa4 black' onSubmit={this.handleSubmit}>
          <div className='measure'>
            <label htmlFor='boardName' className='f6 b db mb2'>Board ID <abbr title='Required'>*</abbr></label>
            <span className='db f6 mb2 black-80' id='boardName-desc'>
              An alphanumeric name that will show up in your game's unique URL
            </span>
            {this.renderBoardNameError()}
            <input
              type='text'
              id='boardName'
              aria-describedby='boardName-error boardName-desc'
              className='input-reset ba b--black-20 pa2 mb2 db w-100'
              required
              maxLength='20'
            />
          </div>
          <div className='measure'>
            <label htmlFor='boardSize' className='f6 b db mb2 pt3'>Board Width <abbr title='Required'>*</abbr></label>
            <span className='db f6 mb2 black-80' id='boardSize-desc'>
              Board will be this many tiles wide, and the same number of tiles tall.
            </span>
            {this.renderBoardSizeError()}
            <input
              type='range'
              id='boardSize'
              aria-describedby='boardSize-error boardSize-desc'
              min='3'
              step='2'
              max='15'
              value={this.state.boardSize}
              onChange={(e) => { this.setState({boardSize: parseInt(e.target.value)}) }}
            />
            <span aria-hidden='true' className='pl2'>{this.state.range}</span>
          </div>
          <div className=''>
            <label htmlFor='lexicon' className='f6 b db mb2 pt3'>
              Lexicon <abbr title='Required'>*</abbr>
            </label>
            <span className='db f6 mb2 black-80' id='lexicon-desc'>
              Place each phrase on its own line. Only 
              alphanumerics, spaces, and basic punctuation, please!
            </span>
            {this.renderLexiconError()}
            <textarea
              id='lexicon'
              aria-describedby='lexicon-error lexicon-desc'
              className='db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mv2'
              rows='15'
            />
          </div>
          <button>
            Create Board
          </button>
        </form>
      </div>
    );
  }
}

export default BoardCreator;
