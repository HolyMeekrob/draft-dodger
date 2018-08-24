import React, { Component } from 'react';

class Teams extends Component {
	render() {
		const teams = this.props.teams.map(team => {
			const name = team.isOwned
				? (<React.Fragment>{team.name}*</React.Fragment>)
				: <React.Fragment>{team.name}</React.Fragment>;

			return (
				<div className="team" key={team.id}>{name}</div>
			);
		});

		return (
			<div className="teams">
				<h2>Teams</h2> 
				{teams}
			</div>
		);
	}
}

export default Teams;
