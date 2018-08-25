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
			byeFilters: allByes,
			searchText: ''
		};

		this.handlePositionFilterChange = this.handlePositionFilterChange.bind(this);
		this.handleByeFilterChange = this.handleByeFilterChange.bind(this);
		this.handleSearchChange = this.handleSearchChange.bind(this);
		this.handleClearSearch = this.handleClearSearch.bind(this);
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

	handleSearchChange(event) {
		this.setState({
			searchText: event.target.value
		});
	}

	handleClearSearch() {
		this.setState({
			searchText: ''
		});
	}

	handleDraftClick(event) {
		this.props.onDraft(event.target.parentNode.dataset.playerId);
	}

	render() {
		const { players } = this.props;
		const {
			byeFilters,
			byes,
			positionFilters,
			positions,
			searchText
		} = this.state;

		const visiblePlayers = players.filter(player => {
			const showPosition = positionFilters.includes(player.position);
			const showBye = byeFilters.includes(player.bye);
			const searchHit = searchText.length === 0
				|| player.name.toLowerCase().includes(searchText.toLowerCase())

			return showPosition && showBye && searchHit;
		});

		const playerList = visiblePlayers.map((player) => {
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

		const clearSearch = searchText.length === 0
			? null
			: <button type="button" onClick={this.handleClearSearch}>Clear</button>

		return (
			<div id="players">
				<h2>Available Players</h2>
				<div id="player-filters">
					<div>
						<label htmlFor="position-filter">Position: </label>
						<Filter
							id="position-filter"
							filters={positions}
							activeFilters={positionFilters}
							onChange={this.handlePositionFilterChange} />
					</div>
					<div>
					<label htmlFor="bye-filter">Bye: </label>
						<Filter
							id="bye-filter"
							filters={byes}
							activeFilters={byeFilters}
							onChange={this.handleByeFilterChange}
						/>
					</div>
				</div>
				<div>
					<label>
						<input type="text" onChange={this.handleSearchChange} />
						Search {clearSearch}
					</label>
				</div>
				<div className="player-list">
					<div className = "player-headers">
						<div>Name</div>
						<div>Pos</div>
						<div>Team</div>
						<div>Bye</div>
					</div>
					{playerList}
				</div>
			</div>
		);
	}
}

export default Players;
