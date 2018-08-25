import React from 'react';

const Count = (props) => {
	const { objKey: key, players, prefix } = props;

	const playerCount = (key) => players.reduce((map, player) => {
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
				<div key={countKey}>{prefix === undefined ? '' : `${prefix} `}{countKey}: {countObj[countKey]}</div>
			);
		});
	};

	return (
		<div>
			By {key}:
			{countDisplay(key)}
		</div>
	);
};

export default Count;