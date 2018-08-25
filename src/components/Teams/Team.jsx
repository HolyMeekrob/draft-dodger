import React from 'react';

import './Team.css';

const Team = (props) => {
	const { team, onGoBack } = props;

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
		<div className="team">
			<h4>{team.name}</h4>
			<div className="roster">
				<div className="roster-headers">
					<div>Name</div>
					<div>Pos</div>
					<div>Team</div>
					<div>Bye</div>
				</div>
				{players}
			</div>
			<div>
				<button type="button" onClick={onGoBack}>Back</button>
			</div>
		</div>
	);
};

export default Team;