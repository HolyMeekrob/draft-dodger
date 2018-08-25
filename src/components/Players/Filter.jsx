import React from 'react';

const Filter = (props) => {
	const options = ['All'].concat(props.filters).map(filter => (
		<option
			key={filter}
			value={filter}
			checked={props.selectedFilter === filter}>
			{filter}
		</option>
	));

	return (
		<select id={props.id} className="filter" onChange={props.onChange}>
			{options}
		</select>
	);
};

export default Filter;
