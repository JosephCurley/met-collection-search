import React from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';

const searchFields = [
	{value: "", name: "All Fields"},
	{value: "ArtistCulture", name: "Artist / Culture"},
	{value: "Title", name: "Title"},
	{value: "Description", name: "Description"},
	{value: "Gallery", name: "Gallery"},
	{value: "AccesionNum", name: "Accesion Number"}
];

const SearchBar = ({onChange, query, selectedField}) => {

	const activeField = searchFields.find(searchField => {
		return searchField.value === selectedField;
	});

	let placeholderText = "Search";

	if (!activeField || selectedField === "") {
		placeholderText = "Search for Artist, Culture, Title, Accession #, Gallery, etc.";
	} else {
		placeholderText = `Search by ${activeField.name}`;
	}

	return (
		<section className="cs__search">
			<DebounceInput
				className="object-search__input"
				key="objectSearchBar"
				placeholder={placeholderText}
				debounceTimeout={400}
				type="search"
				value={query}
				autocomplete="off"
				autocorrect="off"
				autocapitalize="off"
				spellcheck="false"
				onKeyDown={event => event.key === 'Enter' && document.activeElement.blur()}
				onChange={event => onChange("q", event)}
			/>
			<div className="search-type__wrapper cs-select__wrapper">
				<label
					className="screen-reader-only"
					htmlFor="search-type">Search Type:
				</label>
				<select
					className="search-type cs-select"
					name="search-type"
					id="search-type"
					value={selectedField}
					onChange={event => onChange("searchField", event)}>
					{searchFields.map(searchField => {
						return (
							<option key={searchField.value} value={searchField.value}>
								{searchField.name}
							</option>
						)
					})}
				</select>
			</div>
		</section>
	)
};

SearchBar.propTypes = {
	selectedField: PropTypes.string,
	query: PropTypes.string,
	onChange: PropTypes.func
}

export default SearchBar
