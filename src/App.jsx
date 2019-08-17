import React, { Component } from 'react';

import data from './rankings';
import Draft from './components/Draft/Draft';
import Initialize from './components/Initialize/Initialize';

import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			isInitialized: false,
			players: data.players.map(player => ({
				...player,
				id: parseInt(player.id, 10),
				bye: parseInt(player.bye, 10)
			}))
		};

		this.onStart = this.onStart.bind(this);
		this.onDraft = this.onDraft.bind(this);
	}

	onStart(teams) {
		this.setState({
			isInitialized: true,
			teams,
			pick: 1,
			round: 1
		});
	}

	onDraft(playerId) {
		const { pick, round, teams } = this.state;

		const isEvenRound = round % 2 === 0;
		const wrapStart = (pick === 1) && isEvenRound;
		const wrapEnd = (pick === teams.length) && !isEvenRound;

		const nextPick = wrapStart || wrapEnd
			? pick
			: (isEvenRound ? pick - 1 : pick + 1);

		this.setState(prevState => ({
			...prevState,
			pick: nextPick,
			round: (wrapStart || wrapEnd) ? round + 1 : round,
			players: prevState.players.map(player =>
				player.id === parseInt(playerId, 10)
					? { ...player, teamId: pick }
					: player)
		}));
	}

	render() {
		const renderDraft = () => {
			return (
				<React.Fragment>
					<Draft
						teams={this.state.teams}
						players={this.state.players}
						nextPick={this.state.pick}
						onDraft={this.onDraft}
					/>
				</React.Fragment>
			);
		};

		const renderInitialize = () => (<div><Initialize onStart={this.onStart} /></div>);

		const content = this.state.isInitialized
			? renderDraft()
			: renderInitialize();
		return (
			<div className="app">
				<header>
					<h1>Draft Dodger</h1>
				</header>
				<div>
					{content}
				</div>
			</div>
		);
	}
}

export default App;
