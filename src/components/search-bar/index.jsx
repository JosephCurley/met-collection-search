import React from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';
import "./search-bar.scss";

const searchFields = [
	{value: "All", name: "All Fields"},
	{value: "ArtistCulture", name: "Artist / Culture"},
	{value: "Title", name: "Title"},
	{value: "Description", name: "Description"},
	{value: "AccesionNum", name: "Accesion Number"}
];

const SearchBar = ({onChange, query, selectedField}) => (
	<section className="cs__search">
		<DebounceInput
			className="object-search__input"
			key="objectSearchBar"
			placeholder="Search for Artist, Culture, Title, Accession #, Gallery, etc."
			debounceTimeout={400}
			type="search"
			value={query}
			onChange={event => onChange("q", event)}
		/>
		<div className="search-type__wrapper">
			<label
				className="screen-reader-only"
				htmlFor="search-type">Search Type:
			</label>
			<select
				className="search-type"
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
);

SearchBar.propTypes = {
	selectedField: PropTypes.string,
	query: PropTypes.string,
	onChange: PropTypes.func
}

export default SearchBar
