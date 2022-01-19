import React from 'react';
import PropTypes from 'prop-types';

const PaginationControls = ({offset, handlePaginationChange, perPage, totalResults}) => {
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

	const buttonTemplate = (pageNumber, currentPage) => {
		return (
			<button
				aria-label={`Go To Page ${pageNumber+1}`}
				key={pageNumber}
				disabled={pageNumber === currentPage}
				value={(pageNumber - currentPage) * perPage}
				className="pagination-button"
				onClick={handlePaginationChange}
				onKeyDown={event => event.key === 'Enter' && handlePaginationChange(event)}>
				{pageNumber+1}
			</button>
		)};

	const generateButtons = (offset, perPage) => {
		const currentPage = Math.floor(offset/perPage);
		const arrayOfButtons = [];
		if (currentPage >= 2) {
			for (let i = (currentPage-2); i < currentPage+3; i++) {
				arrayOfButtons.push(buttonTemplate(i, currentPage));
			}
		} else if (currentPage >= 1) {
			for (let i = (currentPage-1); i < currentPage+4; i++) {
				arrayOfButtons.push(buttonTemplate(i, currentPage));
			}
		} else if (currentPage === 0) {
			for (let i = (currentPage); i < currentPage+5; i++) {
				arrayOfButtons.push(buttonTemplate(i, currentPage));
			}
		}
		return arrayOfButtons;
	};

	return (
		<div className="cs__page-controls">
			{offset > 0 ? backButton : <div className="button-spacer"/>}
			{generateButtons(offset, perPage)}
			{offset < totalResults ? forwardButton : <div className="button-spacer"/>}
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
