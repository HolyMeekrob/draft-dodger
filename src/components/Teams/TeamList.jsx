import React from 'react';

const TeamList = (props) => {
	const { teams, onSelectTeam } = props;
	const teamList = teams.map(team => {
		const name = team.isOwned
			? (<React.Fragment>{team.name}*</React.Fragment>)
			: <React.Fragment>{team.name}</React.Fragment>;

		const handleSelectTeam = (event) => {
			onSelectTeam(parseInt(event.target.parentNode.dataset.teamId, 10));
		};

		return (
			<div className="team" key={team.id} data-team-id={team.id}>
				<button type="button" href="#" onClick={handleSelectTeam}>{name}</button>
			</div>
		);
	});


	return (
		<div className="team">
			<h2>Teams</h2>
			{teamList}
		</div>
	);
};

export default TeamList;