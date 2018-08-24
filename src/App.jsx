import React, { Component } from 'react';

import data from './rankings';
import Initialize from './components/Initialize/Initialize';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isInitialized: false
    };

    this.onStart = this.onStart.bind(this);
  }

  onStart(teams, ownerIndex) {
    this.setState({
      isInitialized: true,
      teams,
      ownerIndex
    });
  }

  render() {
    const renderDraft = () => {
      const players = data.players.map(player => {
        return (
        <li key={player.name}>
          {player.name}
        </li>
        );
      });

      return (
        <ul>{players}</ul>
      );
    };

    const renderInitialize = () => (<div><Initialize onStart={this.onStart}/></div>);

    const content = this.state.isInitialized
      ? renderDraft()
      : renderInitialize();
    return (
      <div className="app">
        <header>
          <h1>Draft Dodger</h1>
        </header>
        <ul>
          {content}
        </ul>
      </div>
    );
  }
}

export default App;
