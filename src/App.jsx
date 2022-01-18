import React, { useState, useEffect } from 'react';
import ResultObject from './components/result-object';
import './app.scss';

// const url = new URL(`${window.location}`);
// const params = new URLSearchParams(url.search.slice(1));

const searchAPI = 'https://www.metmuseum.org/mothra/collectionlisting/search?';


const defaultParams = {
	"offset": 0,
	"pageSize": 0,
	"perPage": 20,
	"searchField": "All",
	"showOnly": null,
	"sortBy": "Relevance"
};

const App = () => {
	const [searchParams] = useState(defaultParams);
	const [results, setResults] = useState([]);

	const searchCollection = async () => {
		const searchParamsObject = new URLSearchParams(searchParams);
		const searchParamsString = searchParamsObject.toString();

		const request = await fetch(`${searchAPI}${searchParamsString}`);
		const response = await request.json();
		if (response.results) {
			setResults(response.results);
			console.log(response);
		} else {
			console.log("No Results");
		}
	};


	useEffect(() => {
		searchCollection();
	}, []);


	return (
		<main className="cs__main">
			Hello World
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
		</main>
	)
};

export default App;
