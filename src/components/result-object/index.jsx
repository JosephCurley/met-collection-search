import React from 'react';
import PropTypes from 'prop-types';

const ResultObject = ({collectionItem}) => {
	const imageURL = collectionItem.image.includes("metmuseum.org") ?
		collectionItem.image :
		`https://www.metmuseum.org${collectionItem.image}`;
	return (
		<div className="result-object">
			<div className="result-object__image-container">
				<img
					className="result-object__image"
					src={imageURL}
					alt={`Image of ${collectionItem.title}`}
				/>
			</div>
			<h4
				dangerouslySetInnerHTML={{__html: collectionItem.title}}
				className="result-object__title"
			/>
		</div>
	)};

ResultObject.propTypes = {
	collectionItem: PropTypes.object,
};

export default ResultObject;
