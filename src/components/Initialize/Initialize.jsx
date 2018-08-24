import React, { Component } from 'react';

class Initialize extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			teams: []
		};

		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleOwnerChange = this.handleOwnerChange.bind(this);
		this.handleAddClick = this.handleAddClick.bind(this);
		this.handleStartClick = this.handleStartClick.bind(this);
	}

	handleNameChange(event) {
		this.setState({name: event.target.value});
	}

	handleAddClick(event) {
		this.setState(function(prevState) {
			return {
				name: '',
				teams: prevState.teams.concat(this.state.name)
			};
		});
	}

	handleOwnerChange(event) {
		console.log(event.target.value);
		this.setState({
			ownerIndex: parseInt(event.target.value)
		});
	}

	handleStartClick() {
		this.props.onStart(this.state.teams, this.state.ownerIndex);
	}

	render() {
		const teams = this.state.teams.map((team, idx) => {
			return (
				<li key={idx}>
					{team}
					<input type="radio" name="is-mine" value={idx} checked={this.state.ownerIndex === idx} onChange={this.handleOwnerChange} />
				</li>
			);
		});
		return (
			<div className="initialize">
				<div>
					<label htmlFor="new-team">New team: </label>
					<input id="new-team" type="text" value={this.state.name} onChange={this.handleNameChange} />
				</div>
				<div>
					<button type="button" onClick={this.handleAddClick}>Add team</button>
				</div>
				<hr />
				<div>
					<ul>{teams}</ul>
				</div>
				<hr />
				<button type="button" onClick={this.handleStartClick}>Start draft</button>
			</div>
		);
	}
}

export default Initialize;
