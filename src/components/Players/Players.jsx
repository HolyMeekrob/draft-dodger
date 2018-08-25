import React, { Component } from 'react';

import './Players.css';

class Players extends Component {
	constructor(props) {
		super(props);

		this.state = {
			positions: ['ALL'].concat(
				Array.from(new Set(props.players.map(player => player.position)))),
			positionFilter: 'ALL'
		};

		this.handlePositionFilterChange = this.handlePositionFilterChange.bind(this);
		this.handleDraftClick = this.handleDraftClick.bind(this);
	}

	handlePositionFilterChange(event) {
		this.setState({
			positionFilter: event.target.value
		});
	}

	handleDraftClick(event) {
		this.props.onDraft(event.target.parentNode.dataset.playerId);
	}

	render() {
		const visiblePlayers = this.props.players.filter(player =>
			this.state.positionFilter === 'ALL' || player.position === this.state.positionFilter);

		const players = visiblePlayers.map((player) => {
			const isDrafted = player.teamId !== undefined;

			const className = isDrafted ? 'player drafted' : 'player';
			const draftInput = isDrafted
				? null
				: (
					<button type="button" onClick={this.handleDraftClick}>
						Draft
					</button>
				);

			return (
				<div className={className} key={player.id} data-player-id={player.id}>
					{player.name}
					{draftInput}
					</div>
			);
		});

		const positions = this.state.positions.map(position => (
				<option
					key={position}
					value={position}
					checked={this.state.positionFilter === position}>
					{position}
				</option>
			));

		return (
			<div id="players">
				<h2>Available Players</h2>
				<div id="player-filters">
					<label htmlFor="position-filter">Position: </label>
					<select id="position-filter" className="filters" onChange={this.handlePositionFilterChange}>
						{positions}
					</select>
				</div>
				{players}
			</div>
		);
	}
}

export default Players;
