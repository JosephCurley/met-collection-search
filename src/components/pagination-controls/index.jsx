import React from 'react';
import PropTypes from 'prop-types';

const PaginationControls = ({offset, handlePaginationChange, perPage, totalResults, totalCollectionResults}) => {
	const currentPage = Math.floor(offset/perPage) + 1;
	const lastPage = Math.ceil(totalResults/perPage);

	const backButton = (
		<button
			disabled={currentPage === 1}
			aria-label="Previous Page"
			value={-perPage}
			className="pagination-button pagination-button--back"
			onClick={handlePaginationChange}
			onKeyDown={event => event.key === 'Enter' && handlePaginationChange(event)}>
			&ndash;
		</button>
	);

	const forwardButton = (
		<button
			disabled={offset + perPage > totalResults}
			aria-label="Next Page"
			value={perPage}
			className="pagination-button pagination-button--forward"
			onClick={handlePaginationChange}
			onKeyDown={event => event.key === 'Enter' && handlePaginationChange(event)}>
			+
		</button>
	);

	const firstButton = (
		<button
			disabled={currentPage === 1}
			aria-label="First Page"
			value={-perPage * currentPage}
			className="pagination-button pagination-button--first"
			onClick={handlePaginationChange}
			onKeyDown={event => event.key === 'Enter' && handlePaginationChange(event)}>
			1
		</button>
	);

	const lastButton = (
		<button
			disabled={offset + perPage > totalResults}
			aria-label="Last Page"
			value={perPage * (lastPage - currentPage)}
			className="pagination-button pagination-button--last"
			onClick={handlePaginationChange}
			onKeyDown={event => event.key === 'Enter' && handlePaginationChange(event)}>
			{lastPage.toLocaleString()}
		</button>
	);

	const currentButton = (
		<div
			key={currentPage}
			className="cs__current-page">
			{currentPage.toLocaleString()}
		</div>
	);

	return (
		<div className="cs__page-controls">
			{firstButton}
			{backButton}
			{currentButton}
			{forwardButton}
			{ totalResults < totalCollectionResults ? lastButton : <div className="button-spacer button-spacer--wide"/>}
		</div>
	)
};

PaginationControls.propTypes = {
	offset: PropTypes.number,
	handlePaginationChange: PropTypes.func,
	perPage: PropTypes.number,
	totalResults: PropTypes.number,
	totalCollectionResults: PropTypes.number
};

export default PaginationControls;
