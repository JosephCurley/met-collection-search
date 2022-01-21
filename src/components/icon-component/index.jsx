import React from 'react';
import PropTypes from 'prop-types';

const IconComponent = ({icon, text}) => {
	return (
		<div
			className="cs__icon-wrapper"
			tabIndex="0"
			role="button">
			<div className="cs__icon">{icon}</div>
			<div className="cs__icon-modal">
				<div
					className="cs__icon-text"
					dangerouslySetInnerHTML={{__html: text}}
				/>
			</div>
		</div>
	)
};

IconComponent.propTypes = {
	icon: PropTypes.string,
	text: PropTypes.string
};

export default IconComponent;
