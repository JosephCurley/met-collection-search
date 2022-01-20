import React from 'react';
import PropTypes from 'prop-types';

const PaginationControls = ({offset, handlePaginationChange, perPage, totalResults}) => {
	const currentPage = Math.floor(offset/perPage);
	const lastPage = Math.ceil(totalResults/perPage);

	const backButton = (
		<button
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
			aria-label="Last Page"
			value={perPage * (lastPage - currentPage)}
			className="pagination-button pagination-button--last"
			onClick={handlePaginationChange}
			onKeyDown={event => event.key === 'Enter' && handlePaginationChange(event)}>
			{lastPage}
		</button>
	);

	const currentButton = (
		<button
			key={currentPage}
			disabled
			className="pagination-button">
			{currentPage}
		</button>
	);

	// const maxPages = (totalPages, currentPage, numberOfButtons) => {
	// 	return Math.min(totalPages, currentPage + numberOfButtons);
	// };



	return (
		<div className="cs__page-controls">
			{offset > 0 ? firstButton : <div className="button-spacer button-spacer--wide"/>}
			{offset > 0 ? backButton : <div className="button-spacer"/>}
			{currentButton}
			{offset + perPage < totalResults ? forwardButton : <div className="button-spacer"/>}
			{offset + perPage < totalResults ? lastButton : <div className="button-spacer button-spacer--wide"/>}
		</div>
	)
};

PaginationControls.propTypes = {
	offset: PropTypes.number,
	handlePaginationChange: PropTypes.func,
	perPage: PropTypes.number,
	totalResults: PropTypes.number
};

export default PaginationControls;
