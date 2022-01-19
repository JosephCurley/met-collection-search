import React from 'react';
import PropTypes from 'prop-types';

const ResultObject = ({collectionItem}) => {
	const imageURL = collectionItem.image.includes("metmuseum.org") ?
		collectionItem.image :
		`https://www.metmuseum.org${collectionItem.image}`;

	const attributionString = collectionItem.artist || collectionItem.culture;

	const attributionAndDate = attributionString ?
		`${attributionString}, ${collectionItem.date}` :
		collectionItem.date;

	return (
		<a
			href={collectionItem.url}
			className="result-object">
			<div className="result-object__image-container">
				<img
					className="result-object__image"
					src={imageURL}
					alt={`Image of ${collectionItem.title}`}
				/>
			</div>
			<div className="result-object__info">
				<h4
					dangerouslySetInnerHTML={{__html: collectionItem.title}}
					className="result-object__title"
				/>
				<span>{attributionAndDate}</span>
			</div>
		</a>
	)};

ResultObject.propTypes = {
	collectionItem: PropTypes.object,
};

export default ResultObject;
