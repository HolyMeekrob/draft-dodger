import React from 'react';

const isNaturalNumber = (str) => (/^-?\d+$/).test(str);

const Filter = (props) => {
	const handleFilterChange = (event) => {
		const input = event.target.value;
		const value = isNaturalNumber(input)
			? parseInt(input, 10)
			: input;

		const newFilters = event.target.checked
			? props.activeFilters.concat([value])
			: props.activeFilters.filter(filter => filter !== value);


		props.onChange(newFilters);
	};

	const toggleSelectAll = (event) => {
		const activeFilters = event.target.checked
			? props.filters
			: [];

		props.onChange(activeFilters);
	}

	const isActive = (filter) => props.activeFilters.includes(filter);

	const inputs = props.filters.map(filter => {
		return (
			<label key={filter}>
				<input
					type="checkbox"
					value={filter}
					checked={isActive(filter)}
					onChange={handleFilterChange}
				/>
				{filter}
			</label>
		);
	});

	return (
		<div>
			<label>
				<input
					type="checkbox"
					value="All"
					checked={props.activeFilters.length === props.filters.length}
					onChange={toggleSelectAll}
				/>
				All
			</label>
			{inputs}
		</div>
	);
};

export default Filter;
