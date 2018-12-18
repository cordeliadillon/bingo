import React, { Component } from 'react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

momentDurationFormatSetup(moment);

class LeaderBoard extends Component {

  renderEmptyState() {
    if (!this.props.leaders || !this.props.leaders.length) {
      return (
        <div>
          <p>There's no one on the leaderboard yet!</p>
          <p>Get {this.props.size} phrases in a row to add yourself to the list.</p>
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <div>
        <h2>Leaderboard</h2>
        <div role='log'>
          <ol aria-relevant='additions'>
            {this.props.leaders.map((leader, i) => {
              return (
                <li key={i} className='pa1'>
                  <strong>
                    {leader.name}
                    {' '}&middot;{' '}
                    {moment.duration(leader.duration).format('h [hr], m [min], s [sec]')}
                    {' '}&middot;{' '}
                  </strong>
                  {moment(leader.timestamp).format('L LT')}
                </li>
              );
            })}
          </ol>
          {this.renderEmptyState()}
        </div>
      </div>
    );
  }

}

export default LeaderBoard;