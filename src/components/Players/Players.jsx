import React, { Component } from 'react';

import Filter from './Filter';

import './Players.css';

class Players extends Component {
	constructor(props) {
		super(props);

		const getUniques = arr => Array.from(new Set(arr));
		const intSort = (a, b) => a - b;

		const allPositions = getUniques(
			props.players.map(player => player.position))
			.sort();

		const allByes = getUniques(
			props.players
				.map(player => player.bye)
				.filter(bye => bye !== ''))
			.sort(intSort);

		this.state = {
			positions: allPositions,
			positionFilters: allPositions,
			byes: allByes,
			byeFilters: allByes
		};

		this.handlePositionFilterChange = this.handlePositionFilterChange.bind(this);
		this.handleByeFilterChange = this.handleByeFilterChange.bind(this);
		this.handleDraftClick = this.handleDraftClick.bind(this);
	}

	handlePositionFilterChange(filters) {
		this.setState({
			positionFilters: filters
		});
	}

	handleByeFilterChange(filters) {
		this.setState({
			byeFilters: filters
		});
	}

	handleDraftClick(event) {
		this.props.onDraft(event.target.parentNode.dataset.playerId);
	}

	render() {
		const visiblePlayers = this.props.players.filter(player => {
			const showPosition =
				this.state.positionFilters.includes(player.position);
			const showBye = this.state.byeFilters.includes(player.bye);

			return showPosition && showBye;
		});

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
					<div>{player.name}</div>
					<div>{player.position}</div>
					<div>{player.team}</div>
					<div>{player.bye}</div>
					{draftInput}
					</div>
			);
		});

		return (
			<div id="players">
				<h2>Available Players</h2>
				<div id="player-filters">
					<div>
						<label htmlFor="position-filter">Position: </label>
						<Filter
							id="position-filter"
							filters={this.state.positions}
							activeFilters={this.state.positionFilters}
							onChange={this.handlePositionFilterChange} />
					</div>
					<div>
					<label htmlFor="bye-filter">Bye: </label>
						<Filter
							id="bye-filter"
							filters={this.state.byes}
							activeFilters={this.state.byeFilters}
							onChange={this.handleByeFilterChange}
						/>
					</div>
				</div>
				<div className="player-list">
					<div className = "player-headers">
						<div>Name</div>
						<div>Pos</div>
						<div>Team</div>
						<div>Bye</div>
					</div>
					{players}
				</div>
			</div>
		);
	}
}

export default Players;
