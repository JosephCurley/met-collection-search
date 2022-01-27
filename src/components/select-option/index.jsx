import React from 'react';
import PropTypes from 'prop-types';

const SelectOption = props => {
	const { innerProps, innerRef } = props;
	return (
		<div ref={innerRef} {...innerProps} className="cs__facet-option">
			{props.data.label} <span className="cs__facet-count">({props.data.count})</span>
		</div>
	);
};

SelectOption.propTypes = {
	data: PropTypes.object,
	innerProps: PropTypes.object,
	innerRef: PropTypes.object,
}

export default SelectOption