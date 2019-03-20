import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
// import { StyledFirebaseAuth } from 'react-firebaseui';
import Board from './board';
import Instructions from './instructions';
import LeaderBoard from './leaderboard';
import WelcomeScreen from './welcomeScreen';
import firebase from './firebase.js';
import queryString from 'query-string';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameId: queryString.parse(props.location.search).game,
      noSuchGame: false,
      signedIn: false,
    };

    firebase.database().ref('games/' + this.state.gameId).once('value').then((game) => {
      this.setState({
        noSuchGame: !game.exists(),
        lexicon: game.child('lexicon').val(),
        size: game.child('size').val(),
        instructions: game.child('instructions').val()
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
    if (this.state.gameId) {
      if (!this.state.noSuchGame) {
        if (this.state.lexicon && this.state.size) {
          return (
            <div className='app'>
              <Board id='abc' size={this.state.size} values={this.state.lexicon} db={firebase} gameId={this.state.gameId} />
              <LeaderBoard leaders={this.state.leaders} size={this.state.size} />
              <aside>
                <Instructions src={this.state.instructions}/>
              </aside>
            </div>
          );
        } else {
          return (
            <div>
              <header className='white'>
                <h1>Bingo Buddies</h1>
              </header>
              <main className='tc'>
                <div aria-live='polite'>Loading...</div>
              </main>
            </div>
          );
        }
      } 
    }
    return <WelcomeScreen firebase={firebase} />;
  }
}


const AppRouter = () => (
  <Router>
    <Route path="/" exact component={App} />
  </Router>
);

export default AppRouter;
