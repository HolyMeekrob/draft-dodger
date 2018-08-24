import React, { Component } from 'react';

class Initialize extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			teams: [],
			errorMessage: ''
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
		this.setState(prevState => {
			const newTeam = {
				id: prevState.teams.length + 1,
				name: this.state.name,
				isOwned: false
			}
			return {
				name: '',
				teams: prevState.teams.concat(newTeam),
				errorMessage: ''
			};
		});
	}

	handleOwnerChange(event) {
		const selectedValue = parseInt(event.target.value, 10);
		this.setState(prevState => {
			const teams = prevState.teams.map(team => {
				return {
					...team,
					isOwned: team.id === selectedValue
				};
			});

			return {
				...prevState,
				teams
			};
		});
	}

	handleStartClick() {
		if (this.state.teams.filter(team => team.isOwned).length > 0) {
			this.setState({
				errorMessage: ''
			});
			this.props.onStart(this.state.teams);
		} else {
			this.setState({
				errorMessage: 'One team should be owned by user'
			});
		}
	}

	render() {
		const error = this.state.errorMessage.length > 0
			? (<div className="error">{this.state.errorMessage}</div>)
			: null;

		const teams = this.state.teams.map(team => {
			return (
				<li key={team.id}>
					{team.name}
					<input type="radio" name="is-mine" value={team.id} checked={team.isOwned} onChange={this.handleOwnerChange} />
				</li>
			);
		});
		return (
			<div className="initialize">
				{error}
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
