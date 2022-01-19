import React from 'react';
import PropTypes from 'prop-types';

const ResultObject = ({collectionItem}) => {
	const imageURL = collectionItem.image.includes("metmuseum.org") ?
		collectionItem.image :
		`https://www.metmuseum.org${collectionItem.image}`;

	const attributionString = collectionItem.artist || collectionItem.culture;
	const dateString = collectionItem.date || "";

	const attributionAndDate = attributionString  && dateString ?
		`${attributionString}, ${dateString}` :
		attributionString || dateString;

	return (
		<a
			title={`${collectionItem.title} Object Page`}
			href={collectionItem.url}
			className="result-object">
			<div className="result-object__image-container">
				<img
					loading="lazy"
					className="result-object__image"
					src={imageURL}
					alt={`Image of ${collectionItem.title}`}
				/>
			</div>
			<div className="result-object__info">
				<div
					dangerouslySetInnerHTML={{__html: collectionItem.title}}
					className="result-object__title"
				/>
				<div className="result-object__attribution">{attributionAndDate || ""}</div>
			</div>
		</a>
	)};

ResultObject.propTypes = {
	collectionItem: PropTypes.object,
};

export default ResultObject;
