import React, { useState, useEffect } from 'react';
import SearchBar from './components/search-bar';
import ResultObject from './components/result-object';
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

const App = () => {
	const [searchParamsString, setSearchParamsString] = useState(defaultParamString);
	const [results, setResults] = useState([]);

	const searchCollection = async () => {

		const request = await fetch(`${searchAPI}${searchParamsString}`);
		const response = await request.json();
		if (response.results) {
			setResults(response.results);
			console.log(response);
		} else {
			console.log("No Results");
		}
	};

	const handleSearchQueryChange = (param, event) => {
		const paramsObject = new URLSearchParams(searchParamsString);
		paramsObject.set(param, event.target.value);
		setSearchParamsString(paramsObject.toString());
	};

	useEffect(() => {
		searchCollection();
	}, [searchParamsString]);

	return (
		<main className="collection-search">
			<h1>Search The Collection</h1>
			<SearchBar
				onChange={handleSearchQueryChange}
			/>
			<section className="cs__facets">

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
				TODO: add Pagination.
			</section>
		</main>
	)
};

export default App;
