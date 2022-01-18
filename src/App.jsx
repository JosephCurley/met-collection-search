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

const App = () => {
	const [searchParamsString, setSearchParamsString] = useState(defaultParamString);
	const [results, setResults] = useState([]);
	const [facets, setFacets] = useState([defaultFacetObject]);

	const formatAndSetFacets = oldFacets => {
		oldFacets.shift();
		const newFacets = oldFacets.map(facet => {
			const newOptions = facet.values.map(option => {
				return  {
					"selected": option.selected,
					"label": `${option.label} (${option.count})`,
					"value": option.id
				}
			});
			facet.values = newOptions;
			return facet;
		});
		setFacets(newFacets);
	};

	const searchCollection = async () => {
		const request = await fetch(`${searchAPI}${searchParamsString}`);
		const response = await request.json();
		if (response.results) {
			setResults(response.results);
			formatAndSetFacets(response.facets);
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

	useEffect(() => {
		const url = new URL(`${window.location}`);
		const params = new URLSearchParams(url.search.slice(1));
		setSearchParamsString(params.toString());
	}, []);

	useEffect(() => {
		searchCollection();

		const params = new URLSearchParams(searchParamsString);
		params.set('version', 2.0);
		window.history.replaceState({}, '', `${location.pathname}?${params}`);

	}, [searchParamsString]);

	return (
		<main className="collection-search">
			<h1>Search The Collection</h1>
			<SearchBar
				onChange={handleSearchQueryChange}
			/>
			<section className="cs__facets">
				{facets.map(facet => {
					return (
						<Select
							className="cs__facet"
							key={facet.id}
							isMulti
							isSearchable="true"
							name={facet.id}
							placeholder={facet.label}
							onChange={e => handleFacetChange(e,facet)}
							options={facet.values}
						/>
					);
				})}
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
