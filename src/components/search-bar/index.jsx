import React from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';
import "./search-bar.scss";

const SearchBar = ({onChange}) => (
	<section className="cs__search">
		<DebounceInput
			className="object-search__input"
			key="objectSearchBar"
			placeholder="Search Objects"
			debounceTimeout={200}
			type="search"
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
				onChange={event => onChange("searchField", event)}>
				<option value="All">All Fields</option>
				<option value="ArtistCulture">Artist / Culture</option>
				<option value="Title">Title</option>
				<option value="Description">Description</option>
				<option value="AccesionNum">Accesion Number</option>
			</select>
		</div>
	</section>
);

SearchBar.propTypes = {
	onChange: PropTypes.func
}

export default SearchBar
