import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Board from './board';
import BoardCreator from './boardCreator';
import LeaderBoard from './leaderboard';
import firebase from './firebase.js';
import queryString from 'query-string';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameId: queryString.parse(props.location.search).game
    };

    firebase.database().ref('games/' + this.state.gameId).once('value').then((game) => {
      this.setState({
        lexicon: game.child('lexicon').val(),
        size: game.child('size').val()
      });
    });

    firebase.database().ref('games/' + this.state.gameId + '/leaderboard').orderByChild('duration').on('value', (leaderboard) => {
      const values = leaderboard.val();
      const leaders = 
        values ?
          Object.values(leaderboard.val()).sort((a, b) => {
            return a.duration - b.duration;
          }) : [];
      this.setState({leaders: leaders});
    });
  }

  render() {
    if (this.state.size && this.state.lexicon) {
      return (
        <div className='app'>
          <Board id='abc' size={this.state.size} values={this.state.lexicon} db={firebase} gameId={this.state.gameId} />
          <LeaderBoard leaders={this.state.leaders} size={this.state.size} />
        </div>
      );
    }
    return <BoardCreator/>;
  }
}


const AppRouter = () => (
  <Router>
    <Route path="/" exact component={App} />
  </Router>
);

export default AppRouter;
