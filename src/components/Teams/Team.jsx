import React from 'react';

const Team = (props) => {
	const { team, onGoBack } = props;

	const players = team.players.map(player => {
		return (<li key={player.id}>{player.name}</li>);
	});

	return (
		<div className="team">
			<h4>{team.name}</h4>
			<ul>
				{players}
			</ul>
			<div>
				<button type="button" onClick={onGoBack}>Back</button>
			</div>
		</div>
	);
};

export default Team;