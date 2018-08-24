import React, { Component } from 'react';

class Players extends Component {
	constructor(props) {
		super(props);

		this.state = {
			positions: ['ALL'].concat(
				Array.from(new Set(props.players.map(player => player.position)))),
			positionFilter: 'ALL'
		};

		this.handlePositionFilterClick = this.handlePositionFilterClick.bind(this);
	}

	handlePositionFilterClick(event) {
		this.setState({
			positionFilter: event.target.value
		});
	}

	render() {
		const visiblePlayers = this.props.players.filter(player =>
			this.state.positionFilter === 'ALL' || player.position === this.state.positionFilter);

		const players = visiblePlayers.map((player) => {
			return (
				<div className="player" key={player.id}>{player.name}</div>
			);
		});

		const positions = this.state.positions.map(position => (
				<label>
					<input
						type="radio"
						name="position-filter"
						value={position}
						checked={this.state.positionFilter === position}
						onClick={this.handlePositionFilterClick}
					/>
						{position}
				</label>
			));

		return (
			<div id="players">
				<h2>Available Players</h2>
				<div id="player-filters">
					<div className="filters">{positions}</div>
				</div>
				{players}
			</div>
		);
	}
}

export default Players;
