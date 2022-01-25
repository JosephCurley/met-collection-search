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
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				className="bi bi-chevron-left"
				viewBox="0 0 16 16">
				<path
					fillRule="evenodd"
					d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
				/>
			</svg>
		</button>
	);

	const forwardButton = (
		<button
			aria-label="Next Page"
			value={perPage}
			className="pagination-button pagination-button--forward"
			onClick={handlePaginationChange}
			onKeyDown={event => event.key === 'Enter' && handlePaginationChange(event)}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				className="bi bi-chevron-left"
				viewBox="0 0 16 16">
				<path
					fillRule="evenodd"
					d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
				/>

			</svg>
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

	const maxPages = (totalPages, currentPage, numberOfButtons) => {
		return Math.min(totalPages, currentPage + numberOfButtons);
	};

	const generateButtons = (offset, perPage) => {
		const currentPage = Math.floor(offset/perPage);
		const lastPage = Math.ceil(totalResults/perPage);
		const arrayOfButtons = [];
		if (currentPage >= 2) {
			for (let i = (currentPage-2); i < maxPages(lastPage, currentPage, 3); i++) {
				arrayOfButtons.push(buttonTemplate(i, currentPage));
			}
		} else if (currentPage === 1) {
			for (let i = (currentPage-1); i < maxPages(lastPage, currentPage, 4); i++) {
				arrayOfButtons.push(buttonTemplate(i, currentPage));
			}
		} else if (currentPage === 0) {
			for (let i = (currentPage); i < maxPages(lastPage, currentPage, 5); i++) {
				arrayOfButtons.push(buttonTemplate(i, currentPage));
			}
		}
		return arrayOfButtons;
	};

	return (
		<div className="cs__page-controls">
			{offset > 0 ? backButton : <div className="button-spacer"/>}
			{generateButtons(offset, perPage)}
			{offset + perPage < totalResults ? forwardButton : <div className="button-spacer"/>}
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
