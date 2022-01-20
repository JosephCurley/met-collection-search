import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import SearchBar from './components/search-bar';
import ResultObject from './components/result-object';
import PaginationControls from './components/pagination-controls';
import IconComponent from './components/icon-component';
import customStyles from './helpers/custom-styles'
import './app.scss';

const searchAPI = 'https://www.metmuseum.org/mothra/collectionlisting/search?';

const defaultParams = new URLSearchParams({
	"offset": 0,
	"pageSize": 0,
	"perPage": 20,
	"searchField": "All",
	"showOnly": null,
	"sortBy": "Relevance"
});

const defaultParamString = defaultParams.toString();

const defaultFacetObjectArray = [];

for (let i = 0; i < 4; i++) {
	defaultFacetObjectArray.push({id: `dfa-${i}`,"options":[]});
}

const pageSizeOptions = [20,40,80];

const sortByFields = [
	{value: "Relevance", name: "Relevance", key: "Relevance"},
	{value: "Title", name: "Title (a-z)", key: "Title"},
	{value: "TitleDesc", name: "Title (z-a)", key: "TitleDesc"},
	{value: "DateDesc", name: "Date (newest-oldest)", key: "DateDesc"},
	{value: "Date", name: "Date (oldest-newest)", key: "Date"},
	{value: "ArtistMaker", name: "Artist/Maker (a-z)", key: "ArtistMaker"},
	{value: "ArtistMakerDesc", name: "Artist/Maker (z-a)", key: "ArtistMakerDesc"},
	{value: "AccesionNumber", name: "Accession Number (0-9)", key: "AccesionNumber"},
	{value: "AccesionNumberDesc", name: "Accession Number (9-0)", key: "AccesionNumberDesc"}
];

const showOnlyOptions = [
	{value: "highlights", name: "Highlights", key: "highlights"},
	{value: "withImage", name: "Artworks With Image", key: "withImage"},
	{value: "onDisplay", name: "Artworks on Display", key: "onDisplay"},
	{value: "openAccess", name: "Open Access", key: "openAccess"},
	{
		value: "NEprovenance",
		name: "Nazi-era provenance",
		key: "NEprovenance", icon: "i",
		iconText: `Objects with changed or unknown ownership in continental Europe between 1933-1945.
		<a href="https://www.metmuseum.org/about-the-met/policies-and-documents/provenance-research-project">Learn more</a>`
	}
];

const placeholderCollectionItem = {
	"url": "",
	"image": "https://www.metmuseum.org/content/img/placeholders/NoImageAvailableIcon.png",
	"artist": "",
	"data": ""
}

let abortController = null;

const App = () => {
	const [searchParamsString, setSearchParamsString] = useState(defaultParamString);
	const [isSearching, setIsSearching] = useState(false);

	const [query, setQuery] = useState("");
	const [searchField, setSearchField] = useState("");
	const [sortBy, setSortBy] = useState("Relevance");
	const [showOnly, setShowOnly] = useState({});
	const [perPage, setPerPage] = useState(20);
	const [offset, setOffset] = useState(0);
	const [totalResults, setTotalResults] = useState(20001);
	const [results, setResults] = useState(Array(perPage).fill(placeholderCollectionItem));
	const [facets, setFacets] = useState(defaultFacetObjectArray);
	const topRef = React.createRef();

	const formatAndSetFacets = oldFacets => {
		oldFacets.shift();
		const newFacets = oldFacets.map(facet => {
			facet.selectedValues = [];
			facet.options = [];
			facet.values.forEach(option => {
				const formattedOption = {
					"selected": option.selected,
					"label": `${option.label} (${option.count})`,
					"value": option.id
				};
				option.selected && facet.selectedValues.push(formattedOption);
				facet.options.push(formattedOption);
			});

			return facet;
		});
		setFacets(newFacets);
	};

	const callAPI = async () => {
		setIsSearching(true);
		abortController && abortController.abort();
		abortController = new AbortController();
		const request = await fetch(`${searchAPI}${searchParamsString}`, { signal: abortController.signal });
		const response = await request.json();
		if (response.results) {
			setResults(response.results);
			formatAndSetFacets(response.facets);
			setTotalResults(response.totalResults);
		} else {
			console.log("No Results");
		}
	};

	const searchCollection = async () => {
		try {
			await callAPI();
		} catch (e) {
			console.error(e);
		} finally {
			abortController = null;
			setIsSearching(false);
		}
	}

	const handleSearchQueryChange = (param, event) => {
		const paramsObject = new URLSearchParams(searchParamsString);
		paramsObject.set(param, event.target.value);
		paramsObject.set("offset", 0);
		setOffset(0);
		setSearchParamsString(paramsObject.toString());
	};

	const handleFacetChange= (e, facet) => {
		const paramsObject = new URLSearchParams(searchParamsString);
		const newValue = e.map(selectedFacet => selectedFacet.value).join("|")
		paramsObject.set(facet.id, newValue);
		paramsObject.set("offset", 0);
		setOffset(0);
		setSearchParamsString(paramsObject.toString());
	};

	const handleShowOnlyChange = event => {
		const target = event.target;
		const isChecked = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		let newShowOnly = showOnly;

		if (isChecked) {
			newShowOnly[name] = true;
		} else {
			delete newShowOnly[name];
		}
		const showOnlyString = Object.keys(newShowOnly).join("|");
		const paramsObject = new URLSearchParams(searchParamsString);
		paramsObject.set("offset", 0);
		setOffset(0);
		paramsObject.set("showOnly", showOnlyString);
		setSearchParamsString(paramsObject.toString());
	};

	const handlePaginationChange = e => {
		const paramsObject = new URLSearchParams(searchParamsString);
		const newOffset = Math.max(0, parseInt(e.target.value) + parseInt(offset));

		paramsObject.set("offset", newOffset);
		setSearchParamsString(paramsObject.toString());
		setOffset(newOffset);
	};

	const handlePerPageChange = event => {
		const paramsObject = new URLSearchParams(searchParamsString);
		paramsObject.set("perPage", event.target.value);
		setSearchParamsString(paramsObject.toString());
		setPerPage(event.target.value);
	};

	const setStateFromURLParams = params => {
		setQuery(params.get("q") || "");
		setSearchField(params.get("searchField") || "");
		setSortBy(params.get("sortBy") || "Relevance");
		setPerPage(parseInt(params.get("perPage")) || 20);
		setOffset(parseInt(params.get("offset")) || 0);
		if (params.get("showOnly") !== "null" && params.get("showOnly")) {
			const showOnlyObj = params.get("showOnly").split("|").reduce((o, key) => ({ ...o, [key]: true}), {})
			setShowOnly(showOnlyObj);
		}
	};

	const scrollToRef = ref => {
		ref.current.scrollIntoView({
			block: 'start',
			behavior: 'smooth'
		});
	};

	useEffect(() => {
		const url = new URL(`${window.location}`);
		const params = new URLSearchParams(url.search.slice(1));
		setSearchParamsString(params.toString());

		setStateFromURLParams(params);
	}, []);

	useEffect(() => {
		searchCollection();
		const params = new URLSearchParams(searchParamsString);
		window.history.replaceState({}, '', `${location.pathname}?${params}`);
		setStateFromURLParams(params);
	}, [searchParamsString]);

	return (
		<main
			ref={topRef}
			className={isSearching ? `is-searching collection-search` : `collection-search`}>
			<h1>Search The Collection</h1>
			<SearchBar
				query={query}
				selectedField={searchField}
				onChange={handleSearchQueryChange}
			/>
			<section className="cs__facets">
				<span className="cs__section-title">Filter By:</span>
				<div className="cs__facet-wrapper">
					{facets.map(facet => {
						return (
							<div
								key={facet.id}
								className="cs__facet-container">
								<label
									className="cs__facet-label screen-reader-only"
									htmlFor={facet.id}>
									{facet.label}
								</label>
								<Select
									styles={customStyles}
									defaultValue={facet.selectedValues}
									className="cs__facet"
									isMulti
									isSearchable="true"
									inputId={facet.id}
									name={facet.id}
									placeholder={facet.label}
									onChange={e => handleFacetChange(e,facet)}
									options={facet.options}
								/>
							</div>
						);
					})}
				</div>
			</section>

			<section className="cs__show-only">
				<span className="cs__section-title">Show Only:</span>
				<ul className="cs__show-wrapper">
					{showOnlyOptions.map(option => {
						return (
							<li key={option.value} className="cs__show-option">
								<input
									checked={Object.keys(showOnly).includes(option.value)}
									name={option.value}
									onChange={handleShowOnlyChange}
									type="checkbox"
									id={option.value}
								/>
								<label htmlFor={option.value}>
									{option.name}
								</label>
								{option.icon && <IconComponent icon={option.icon} text={option.iconText}/>}
							</li>
						)
					})}
				</ul>
			</section>
			<section className="cs__sort-results">
				<div className="cs__total-results">
					Showing {totalResults > 20000 ? "tens of thousands of" : totalResults.toLocaleString()} results
				</div>
				<div className="cs__sort-control">
					<span className="cs__section-title">Sort By:</span>
					<div className="cs-select__wrapper">
						<select
							className="cs-select"
							name="sort-by"
							id="sort-by"
							value={sortBy}
							onChange={event => handleSearchQueryChange("sortBy", event)}>
							{sortByFields.map(sortBy => {
								return (
									<option key={sortBy.value} value={sortBy.value}>
										{sortBy.name}
									</option>
								)
							})}
						</select>
					</div>
				</div>
			</section>
			{results.length > 0 ? (
				<section className="cs__results">
					{results.map(collectionItem => {
						return (
							<ResultObject
								key={collectionItem.accessionNumber}
								collectionItem={collectionItem}
							/>
						);
					})}
				</section>) :
				(<section className="cs__no-results">
					There are no results found. Please try another search.
				</section>)
			}
			<section className="cs__pagination">
				<PaginationControls
					offset={offset}
					handlePaginationChange={handlePaginationChange}
					perPage={perPage}
					totalResults={totalResults}
				/>
				<div className="cs__rpp">
					<span>Results per page:</span>
					{pageSizeOptions.map(value => {
						return (
							<button
								disabled={perPage === value}
								value={value}
								onKeyDown={event => event.key === 'Enter' && handlePerPageChange(event)}
								onClick={event => handlePerPageChange(event)}
								key={value}
								className="rpp__option">
								{value}
							</button>
						)
					})}
				</div>
				<div className="rtt__wrapper">
					<button
						onKeyDown={event => event.key === 'Enter' && scrollToRef(topRef)}
						onClick={() => scrollToRef(topRef)}
						className="cs__rtt-button">
						Return To Top
					</button>
				</div>
			</section>
		</main>
	)
};

export default App;
