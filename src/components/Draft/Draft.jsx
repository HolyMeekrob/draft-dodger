import React from 'react';

import Players from '../Players/Players';
import Teams from '../Teams/Teams';

const Draft = (props) => {
	const { nextPick, onDraft, players, teams } = props;

	const teamData = teams.map(team => {
		return {
			...team,
			players: players.filter(player => player.teamId === team.id)
		};
	});
	return (
		<div id="draft">
			<h3>
				Next pick: {teams.find(team => team.id === nextPick).name}
			</h3>
			<Teams teams={teamData} />
			<Players players={players} onDraft={onDraft} />
		</div>
	);
};

export default Draft;