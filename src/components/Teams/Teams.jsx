import React, { Component } from 'react';

import Team from './Team';
import TeamList from './TeamList';

import './Teams.css';

class Teams extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedTeam: null
		};

		this.onSelectTeam = this.onSelectTeam.bind(this);
	}

	onSelectTeam(teamId) {
		this.setState({
			selectedTeam: teamId
		});
	}

	render() {
		const { selectedTeam } = this.state;
		const { teams } = this.props;

		const content = selectedTeam === null
			? <TeamList teams={teams} onSelectTeam={this.onSelectTeam} />
			: <Team
					team={teams.find(team => team.id === selectedTeam)}
					onGoBack={() => this.onSelectTeam(null)}
					/>

		return (
		<div id="teams">
			{content}
		</div>
		);
	}
}

export default Teams;
