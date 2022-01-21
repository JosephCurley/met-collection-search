const focusBackgroundColor = `rgba(93, 16, 73, 0.1)`;
const focusColor = `rgba(93, 16, 73, 1)`;
const grey100 = `#f0f0f0`;
const grey200 = `#e3e3e3`;
// const grey700 = `#64696b`;

const customStyles = {
	control: (provided, state) => ({
		...provided,
		backgroundColor: state.isFocused ? focusBackgroundColor : "white",
		borderColor: state.isFocused || state.isSelected ? focusColor : "black",
		boxShadow: state.isFocused ? `0 0 0 1px ${focusBackgroundColor}` : "none",
		"&:hover": {
			borderColor: focusColor,
			backgroundColor: focusBackgroundColor
		}
	}),
	option: (provided, state) => ({
		...provided,
		backgroundColor: state.isFocused ? focusBackgroundColor : "transparent"
	}),

	multiValue: provided => ({
		...provided,
		backgroundColor: grey100,
		".option-count": {
			display: "none"
		}
	}),
	multiValueRemove: provided => ({
		...provided,
		"&:hover": {
			backgroundColor: grey200,
			color: "black"
		}
	}),
}
export default customStyles;
