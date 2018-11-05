import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './board.css';

function copyObject(obj) {
  return Object.assign({}, obj);
}

/* https://stackoverflow.com/a/12646864 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

  /* https://stackoverflow.com/a/21294619 */
function millisecondsToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return (seconds == 60 ? (minutes+1) + " min" : minutes + " min, " + (seconds < 10 ? "0" : "") + seconds + " sec");
}

class Board extends Component {
  constructor(props) {
    super(props);

    const size = props.size % 2 ? props.size : props.size - 1;
    const cellCount = size * size;

    let values = props.values.slice();
    let i = 0;
    while (values.length < cellCount) {
      values.push(values[i]);
      i++;
      if (i > props.values.length - 1) i = 0;
    }
    values = shuffleArray(values);

    this.state = {
      activeCell: 0,
      activeRow: 0,
      activeCol: 0,
      grid: [],
      selection: {},
      size: size,
      startTime: Date.now()
    };

    this.state.midpoint = (size * size - 1)/ 2;

    for (let row = 0; row < size; row++) {
      this.state.grid[row] = [];
      for (let col = 0; col < size; col++) {
        let id = col + (row * size);
        this.state.grid[row][col] = {
          value: values[id],
          id: id
        }
      }
    }

    for (let id = 0; id < values.length && id < cellCount; id++) {
      this.state.selection[id] = id === this.state.midpoint ? true : false;
    }

    this.state.activeCell = 0;
    this.state.selectedValues = [];
    this.handleKeyDown = this.handleKeyDown.bind(this);
    console.log(this.state.size, this.state);
  }

  componentDidUpdate(prevProps, prevState) {

    // focus active cell
    if (prevState.activeCell !== this.state.activeCell) {
      document.getElementById(this.props.id + '-cell-' + this.state.activeCell).focus();
    }

    if (prevState.selection !== this.state.selection) {
      if (
        this.checkRow(this.state.activeRow) ||
        this.checkCol(this.state.activeCol) ||
        this.checkDiagonalA(this.state.activeRow, this.state.activeCol) ||
        this.checkDiagonalB(this.state.activeRow, this.state.activeCol)
      ) {
        if (!this.state.bingo) {
          const endTime = Date.now();
          this.setState({
            bingo: true,
            endTime: endTime,
            totalTime: millisecondsToMinutesAndSeconds(endTime - this.state.startTime)
          });
        }
      }
    }
  }

  checkRow(row) {
    const size = this.state.size;
    const rowStart = this.state.activeRow * size;
    for (let i = rowStart; i < rowStart + size; i++) {
      if (!this.state.selection[i]) {
        return false;
      }
    }

    return true;
  }

  checkCol(col) {
    const size = this.state.size;
    for (let j = this.state.activeCol; j < size * size; j+= size) {
      if (!this.state.selection[j]) {
        return false;
      }
    }
    return true;
  }

  checkDiagonalA(row, col) {
    const size = this.state.size;
    if (row === col || row === size - col - 1) {
      for (let i = 0; i < size; i++) {
        if (!this.state.selection[size * i + i]) {
          return false;
        }
      }
      return true;
    }
  }

  checkDiagonalB(row, col) {
    const size = this.state.size;
    if (row === col || row === size - col - 1) {
      for (let i = 0; i < size; i++) {
        if (!this.state.selection[size * i + size - i - 1]) {
          return false;
        }
      }
      return true;
    }
  }

  handleKeyDown(event, row, col) {
    switch (event.key) {
      case 'Down':
      case 'ArrowDown':
        if (row < this.state.size - 1) this.setActiveCell(row + 1, col);
        event.preventDefault();
        break;
      case 'Up':
      case 'ArrowUp':
        if (row > 0) this.setActiveCell(row - 1, col);
        event.preventDefault();
        break;
      case 'Left':
      case 'ArrowLeft':
        if (col > 0) this.setActiveCell(row, col - 1);
        event.preventDefault();
        break;
      case 'Right':
      case 'ArrowRight':
        if (col < this.state.size - 1) this.setActiveCell(row, col + 1);
        event.preventDefault();
        break;
      default:
        break;
    }
  }

  setActiveCell(row, col) {
    this.setState({activeCell: this.state.grid[row][col].id});
  }

  renderCell(cell, row, col) {
    const isMidpoint = cell.id === this.state.midpoint;
    const selected = this.state.selection[cell.id] || isMidpoint ? true : false;
    const id = cell.id;

    if (isMidpoint) {
      return (
        <td role='gridcell' key={id}>
          <div className='cell-contents'>
            <button
              aria-disabled={true}
              aria-pressed={true}
              className='cell-toggle'
              id={this.props.id + '-cell-' + id}
              onClick={() => {this.setState({activeCell : id});}}
              onKeyDown={(event) => {this.handleKeyDown(event, row, col);}}
              tabIndex={id === this.state.activeCell ? '0' : '-1'}
            >
              <svg aria-label='Star (free tile)' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12.6 1.4l2.2 7c.1.2.3.4.6.4h6.9c.7 0 1 .9.5 1.3l-5.7 4.2c-.2.1-.3.5-.2.7l2.7 7.2c.2.6-.5 1.2-1.1.7l-6-4.5c-.3-.2-.6-.2-.9 0l-6.1 4.5c-.5.5-1.3-.1-1-.7L7.1 15c.1-.2 0-.6-.3-.7l-5.6-4.2c-.6-.4-.2-1.3.4-1.3h6.9c.4 0 .6-.1.7-.4l2.2-7c.1-.7 1.1-.6 1.2 0z"></path>
              </svg>
            </button>
          </div>
        </td>

      );
    }

    return (
      <td role='gridcell' key={cell.id}>
        <div className='cell-contents'>
          <button
            aria-pressed={selected}
            className='cell-toggle'
            id={this.props.id + '-cell-' + cell.id}
            onClick={() => {
              let selection = copyObject(this.state.selection);
              selection[id] = !selected;

              this.setState({
                selection: selection,
                activeCell: id,
                activeRow: row,
                activeCol: col
              });
            }}
            onKeyDown={(event) => {this.handleKeyDown(event, row, col);}}
            tabIndex={id === this.state.activeCell ? '0' : '-1'}
          >
            {cell.value}
          </button>
        </div>
      </td>
    );
  }

  renderRow(row, y) {
    return (
      <tr key={y}>
        {row.map((cell, x) => { return this.renderCell(cell, y, x); })}
      </tr>
    );
  }

  render() {
    return (
      <main>
        <div role="alert">
          {this.state.bingo ? 'Bingo! (' + this.state.totalTime + ')' : ''}
        </div>
        <table role='grid'>
          {this.state.grid.map((row, y) => { return (this.renderRow(row, y))})}
        </table>
      </main>
    );
  }
}

Board.propTypes = {
  size: PropTypes.number,
  data: PropTypes.array
}

Board.defaultProps = {
  size: 5
}

export default Board;
