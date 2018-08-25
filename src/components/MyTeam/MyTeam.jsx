import React, { Component } from 'react';

import Count from './Count';

class MyTeam extends Component {
	constructor(props) {
		super(props);

		this.state = {
			maxPerBye: 3
		};
	}

	render() {
		const { team } = this.props;

		const players = team.players.map(player => {
			return (
				<div className="player" key={player.id}>
					<div>{player.name}</div>
					<div>{player.position}</div>
					<div>{player.team}</div>
					<div>{player.bye}</div>
				</div>);
		});

		return (
			<div id="my-team">
				<h2>My Team - {team.name}</h2>
				<Count players={team.players} objKey="position" />
				<Count players={team.players} objKey="bye" prefix="Week" />
				<Count players={team.players} objKey="team" />
				<div className="roster">
					{players}
				</div>
			</div>
		);
	}
}

export default MyTeam;