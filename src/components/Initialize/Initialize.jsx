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
		this.handleMoveUpClick = this.handleMoveUpClick.bind(this);
		this.handleMoveDownClick = this.handleMoveDownClick.bind(this);
		this.handleStartClick = this.handleStartClick.bind(this);
	}

	handleNameChange(event) {
		this.setState({ name: event.target.value });
	}

	handleAddClick() {
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

	handleMoveUpClick(event) {
		const teamId = parseInt(event.target.parentNode.dataset.teamId, 10);
		this.setState(prevState => {
			const teams = prevState.teams.map(team => {
				const id = team.id === teamId
					? teamId - 1
					: team.id === teamId - 1 ? teamId : team.id;

				return {
					...team,
					id
				};
			});

			teams.sort((a, b) => a.id - b.id);

			return {
				...prevState,
				teams
			};
		});
	}

	handleMoveDownClick(event) {
		const teamId = parseInt(event.target.parentNode.dataset.teamId, 10);
		this.setState(prevState => {
			const teams = prevState.teams.map(team => {
				const id = team.id === teamId
					? teamId + 1
					: team.id === teamId + 1 ? teamId : team.id;

				return {
					...team,
					id
				};
			});

			teams.sort((a, b) => a.id - b.id);

			return {
				...prevState,
				teams
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
		const { errorMessage, name, teams } = this.state;

		const error = errorMessage.length > 0
			? (<div className="error">{errorMessage}</div>)
			: null;

		const teamList = teams.map(team => {
			const moveUp = team.id === 1
				? null
				: <button type="button" onClick={this.handleMoveUpClick}>&#8593;</button>;

			const moveDown = team.id === teams.length
				? null
				: <button type="button" onClick={this.handleMoveDownClick}>&#8595;</button>;

			return (
				<li key={team.id} data-team-id={team.id}>
					{moveUp} {moveDown} {team.name}
					<input type="radio" name="is-mine" value={team.id} checked={team.isOwned} onChange={this.handleOwnerChange} />
				</li>
			);
		});
		return (
			<div className="initialize">
				{error}
				<div>
					<label htmlFor="new-team">New team: </label>
					<input id="new-team" type="text" value={name} onChange={this.handleNameChange} />
				</div>
				<div>
					<button type="button" onClick={this.handleAddClick}>Add team</button>
				</div>
				<hr />
				<div>
					<ol>{teamList}</ol>
				</div>
				<hr />
				<button type="button" onClick={this.handleStartClick}>Start draft</button>
			</div>
		);
	}
}

export default Initialize;
