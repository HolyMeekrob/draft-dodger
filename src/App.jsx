import React, { Component } from 'react';

import data from './rankings';
import Draft from './components/Draft/Draft';
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

  onStart(teams) {
    this.setState({
      isInitialized: true,
      teams,
      nextPick: 1
    });
  }

  render() {
    const renderDraft = () => {
      return (
        <React.Fragment>
          <Draft teams={this.state.teams} players={data.players} nextPick={this.state.nextPick} />
        </React.Fragment>
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
