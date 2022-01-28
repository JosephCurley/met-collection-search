import React from 'react';
import PropTypes from 'prop-types';

const SelectOption = ({ innerRef, innerProps, data, isFocused, isDisabled}) => {
	
	return !isDisabled ? (
		<div
			aria-disabled={isDisabled}
			ref={innerRef}
			{...innerProps}
			className={`cs__facet-option ${isFocused ? "is-focused" : ""}`}>
			{data.label} <span className="cs__facet-count">({data.count})</span>
		</div>
	) : null;
};

SelectOption.propTypes = {
	data: PropTypes.object,
	innerProps: PropTypes.object,
	innerRef: PropTypes.func,
	isFocused: PropTypes.bool,
	isDisabled: PropTypes.bool
}

export default SelectOption