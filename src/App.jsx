import React, { useState, useEffect } from 'react';
import SearchBar from './components/search-bar';
import ResultObject from './components/result-object';
import Select from 'react-select';
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
const defaultFacetObject = {id: "Facet","options":[]}

const showOnlyOptions = [
	{value: "highlights", name: "Highlights"},
	{value: "withImage", name: "Artworks With Image"},
	{value: "onDisplay", name: "Artworks on Display"},
	{value: "openAccess", name: "Open Access"},
	{value: "provenance", name: "Nazi-era provenance"},
];

const App = () => {
	const [searchParamsString, setSearchParamsString] = useState(defaultParamString);

	const [query, setQuery] = useState("");
	const [searchField, setSearchField] = useState("");
	const [showOnly, setShowOnly] = useState({});

	const [results, setResults] = useState([]);
	const [facets, setFacets] = useState([defaultFacetObject]);

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

	const searchCollection = async () => {
		const request = await fetch(`${searchAPI}${searchParamsString}`);
		const response = await request.json();
		if (response.results) {
			await setResults(response.results);
			await formatAndSetFacets(response.facets);
		} else {
			console.log("No Results");
		}
	};

	const handleSearchQueryChange = (param, event) => {
		const paramsObject = new URLSearchParams(searchParamsString);
		paramsObject.set(param, event.target.value);
		setSearchParamsString(paramsObject.toString());
	};

	const handleFacetChange= (e, facet) => {
		const paramsObject = new URLSearchParams(searchParamsString);
		const newValue = e.map(selectedFacet => selectedFacet.value).join("|")
		paramsObject.set(facet.id, newValue);
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

		paramsObject.set("showOnly", showOnlyString);
		setSearchParamsString(paramsObject.toString());
	};

	const setStateFromURLParams = params => {
		setQuery(params.get("q") || "");
		setSearchField(params.get("searchField") || "");

		if (params.get("showOnly")) {
			console.log(params.get("showOnly").split("|"));
			const showOnlyObj = params.get("showOnly").split("|").reduce((o, key) => ({ ...o, [key]: true}), {})
			setShowOnly(showOnlyObj);
		}
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
	}, [searchParamsString]);

	return (
		<main className="collection-search">
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
							<Select
								defaultValue={facet.selectedValues}
								className="cs__facet"
								key={facet.id}
								isMulti
								isSearchable="true"
								name={facet.id}
								placeholder={facet.label}
								onChange={e => handleFacetChange(e,facet)}
								options={facet.options}
							/>
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
							</li>
						)
					})}
				</ul>
			</section>

			<section className="cs__results">
				{results.map(collectionItem => {
					return (
						<ResultObject
							key={collectionItem.accessionNumber}
							collectionItem={collectionItem}
						/>
					);
				})}
			</section>
			<section className="pagination">
			</section>
		</main>
	)
};

export default App;
