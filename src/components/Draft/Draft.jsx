import React, { Component } from 'react';

import Players from '../Players/Players';
import Teams from '../Teams/Teams';

class Draft extends Component {
	constructor(props) {
		super(props);

		this.state = {
			round: 1
		};
	}

	render() {
		return (
			<div id="draft">
				<h3>
					Next pick: {this.props.teams.find(team => team.id === this.props.nextPick).name}
				</h3>
				<Teams teams={this.props.teams} />
				<Players players={this.props.players} />
			</div>
		);
	}
}

export default Draft;