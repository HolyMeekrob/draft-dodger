import React from 'react';

import Players from '../Players/Players';
import Teams from '../Teams/Teams';

const Draft = (props) => {
	return (
		<div id="draft">
			<h3>
				Next pick: {props.teams.find(team => team.id === props.nextPick).name}
			</h3>
			<Teams teams={props.teams} />
			<Players players={props.players} onDraft={props.onDraft} />
		</div>
	);
};

export default Draft;