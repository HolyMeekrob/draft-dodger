import React, { Component } from 'react';

class Players extends Component {
	render() {
		const players = this.props.players.map((player) => {
			return (
				<div className="team">{player.name}</div>
			);
		});

		return (
			<div className="players">
				<h2>Players</h2>
				{players}
			</div>
		);
	}
}

export default Players;
