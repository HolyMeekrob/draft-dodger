import React from 'react';

const Filter = (props) => {
	const handleFilterChange = (event) => {
		const newFilters = event.target.checked
			? props.activeFilters.concat([event.target.value])
			: props.activeFilters
				.filter(filter => filter !== event.target.value);

		
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
