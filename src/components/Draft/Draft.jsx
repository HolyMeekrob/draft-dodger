import React from 'react';

import Guide from '../Guide/Guide';
import MyTeam from '../MyTeam/MyTeam';
import Players from '../Players/Players';
import Teams from '../Teams/Teams';

import './Draft.css';

const Draft = (props) => {
	const { nextPick, onDraft, players, teams } = props;

	const teamData = teams.map(team => {
		return {
			...team,
			players: players.filter(player => player.teamId === team.id)
		};
	});

	const ownedTeam = teamData.find(team => team.isOwned);

	return (
		<div id="draft">
			<h3>
				Next pick: {teams.find(team => team.id === nextPick).name}
			</h3>
			<div className="draft-container">
				<Guide
					players={players.filter(player => player.teamId === undefined)}
					team={ownedTeam}
					ownerCanDraft={nextPick === ownedTeam.id}
					onDraft={onDraft}
				/>
				<MyTeam team={ownedTeam} />
				<Teams teams={teamData} />
				<Players players={players} onDraft={onDraft} />
			</div>
		</div>
	);
};

export default Draft;