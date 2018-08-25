import React, { Component } from 'react';

class MyTeam extends Component {
	constructor(props) {
		super(props);

		this.state = {
			maxPerBye: 3
		};
	}

	render() {
		const { team } = this.props;

		const players = team.players.map(player => {
			return (
				<div className="player" key={player.id}>
					<div>{player.name}</div>
					<div>{player.position}</div>
					<div>{player.team}</div>
					<div>{player.bye}</div>
				</div>);
		});

		const playerCount = (key) => team.players.reduce((map, player) => {
			const val = player[key];
			if (map[val] === undefined) {
				map[val] = 0;
			}

			map[val] = map[val] + 1;
			return map;
		}, {});

		const countDisplay = (key) => {
			const countObj = playerCount(key);
			return Object.keys(countObj).map(countKey => {
				return (
					<div>{countKey}: {countObj[countKey]}</div>
				);
			});
		};

		return (
			<div id="my-team">
				<h2>My Team - {team.name}</h2>
				<div>
					By position:
					{countDisplay('position')}
				</div>
				<div>
					By bye:
					{countDisplay('bye')}
				</div>
				<div>
					By team:
					{countDisplay('team')}
				</div>
				<div className="roster">
					{players}
				</div>
			</div>
		);
	}
}

export default MyTeam;