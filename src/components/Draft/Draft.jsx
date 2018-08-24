import React, { Component } from 'react';

import Players from '../Players/Players';
import Teams from '../Teams/Teams';

class Draft extends Component {
	constructor(props) {
		super(props);

		this.state = {
			round: 1,
			nextPick: 0
		};
	}

	render() {
		return (
			<div id="draft">
				<Teams teams={this.props.teams} />
				<Players players={this.props.players} />
			</div>
		);
	}
}

export default Draft;