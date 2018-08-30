import React from 'react';

import './Guide.css';

class Guide extends React.Component {
	constructor(props) {
		super(props);

		const getUniques = (key) =>
			Array.from(new Set(props.players.map(player => player[key])));

		const byes = getUniques('bye');
		const teams = getUniques('team');
		const positions = getUniques('position');

		this.state = {
			byes,
			teams,
			positions,
			recommendedPick: props.players[0],
			positionFilter: '',
			maxPerTeam: -1,
			maxPerBye: 3,
			maxPerPosition: positions.reduce((obj, position) => {
				obj[position] = 3;
				return obj;
			}, {})
		};

		this.handleMaxPerByeChange = this.handleMaxPerByeChange.bind(this);
		this.handleMaxPerTeamChange = this.handleMaxPerTeamChange.bind(this);
		this.handleMaxPerPositionChange = this.handleMaxPerPositionChange.bind(this);
		this.handlePositionFilterChange = this.handlePositionFilterChange.bind(this);
		this.handleDraftRecommended = this.handleDraftRecommended.bind(this);
	}

	updateRecommendedPick() {
		const { players, team } = this.props;
		const {
			byes,
			maxPerBye,
			maxPerPosition,
			maxPerTeam,
			positionFilter,
			positions,
			teams
		} = this.state;

		const getCounts = (key, vals) => {
			const initialCounts = vals.reduce((counts, val) => {
				counts[val] = 0;
				return counts;
			}, {});

			return team.players.reduce((counts, player) => {
				counts[player[key]] = counts[player[key]] + 1;
				return counts;
			}, initialCounts);
		};

		const getFilteredValues = (key, vals, getMax) => {
			const counts = getCounts(key, vals);
			return Object.keys(counts)
				.filter(countKey =>
					getMax(countKey) !== -1 && counts[countKey] >= getMax(countKey));
		};

		const filteredByes = getFilteredValues('bye', byes, () => maxPerBye);
		const filteredTeams = getFilteredValues('team', teams, () => maxPerTeam);
		const filteredPositions = getFilteredValues(
			'position', positions,(position) => maxPerPosition[position]);

		const source = positionFilter === ''
			? players
			: players.filter(player => player.position === positionFilter);

		const recommendedPick = source
			.filter(player =>
				!filteredByes.includes(player.bye)
				&& !filteredTeams.includes(player.team)
				&& !filteredPositions.includes(player.position))[0];

		this.setState({ recommendedPick });
	}

	componentDidUpdate(prevProps, prevState) {
		const { players } = this.props;
		const {
			maxPerBye,
			maxPerTeam,
			maxPerPosition,
			positionFilter,
			positions
		} = this.state;

		const playersChanged = prevProps.players.length !== players.length;
		const positionSettingChanged = position =>
			prevState.maxPerPosition[position] !== maxPerPosition[position];

		const settingsChanged =
			(prevState.positionFilter !== positionFilter)
			|| (prevState.maxPerTeam !== maxPerTeam)
			|| (prevState.maxPerBye !== maxPerBye)
			|| (positions.filter(positionSettingChanged).length > 0);

		if (playersChanged || settingsChanged) {
			this.updateRecommendedPick();
		}
	}

	handleMaxPerByeChange(event) {
		this.setState({
			maxPerBye: parseInt(event.target.value, 10)
		});
	}
	
	handleMaxPerTeamChange(event) {
		this.setState({
			maxPerTeam: parseInt(event.target.value, 10)
		});
	}

	handleMaxPerPositionChange(event) {
		const position = event.target.dataset.position;
		const newMax = parseInt(event.target.value, 10);

		this.setState(prevState => {
			const maxPerPosition = { ...prevState.maxPerPosition };
			maxPerPosition[position] = newMax;

			return {
				...prevState,
				maxPerPosition
			};
		});
	}

	handlePositionFilterChange(event) {
		this.setState({
			positionFilter: event.target.value
		});
	}

	handleDraftRecommended() {
		this.props.onDraft(this.state.recommendedPick.id);
	}

	render() {
		const { ownerCanDraft } = this.props;
		const {
			maxPerBye,
			maxPerPosition,
			maxPerTeam,
			positions,
			recommendedPick
		} = this.state;

		const positionMaxes = positions.map(position => {
			return (
				<div key={position}>
					<label>
						<input
							type="number"
							min="-1"
							data-position={position}
							value={maxPerPosition[position]}
							onChange={this.handleMaxPerPositionChange}
						/>
						{position}
					</label>
				</div>
			);
		});

		const positionFilters = [(
			<option value="" key="ALL">ALL</option>
		)].concat(
				positions.map(position => (
					<option key={position} value={position}>{position}</option>
				))
		);

		const recommendation = recommendedPick === undefined
			? 'None available'
			: recommendedPick.name

		const action = recommendedPick === undefined || !ownerCanDraft
			? null
			: <button type="button" onClick={this.handleDraftRecommended}>
					Draft
				</button>;

		return (
			<div className="guide">
				<h2>Draft recommendation</h2>
				<h5>Max values (-1 for none)</h5>
				<div>
					<label>
						<input
							type="number"
							min="-1"
							value={maxPerBye}
							onChange={this.handleMaxPerByeChange}
						/>
						byes
					</label>
				</div>
				<div>
					<label>
						<input
							type="number"
							min="-1"
							value={maxPerTeam}
							onChange={this.handleMaxPerTeamChange}
						/>
						teams
					</label>
				</div>
				{positionMaxes}
				<div>
					<select onChange={this.handlePositionFilterChange}>
						{positionFilters}
					</select>
				</div>
				<div className="recommended-pick">
					<h5>
						Recommended pick: {recommendation} {action}
					</h5>
				</div>
			</div>
		);
	}
}

export default Guide;