const MODULE_NAME$ = "SpinnerElement"
console.debug(MODULE_NAME$)

const React = require("react")
const { ActivityIndicator } = require("react-native")

const { useStyle } = require("/coordinators")

const SpinnerElement = ({ color, ...props }) => {
	const { defaultStyle } = useStyle()
	return (
		<ActivityIndicator
			{...props}
			color={color ? color : props.inverse ? defaultStyle.inverseSpinnerColor : defaultStyle.defaultSpinnerColor}
			size={props.size || "large"}
		/>
	)
}

if (__DEV__) {
	const { array, bool, number, object, oneOfType, string } = require("/utils/propTypes")
	SpinnerElement.propTypes = {
		...ActivityIndicator.propTypes,
		color: string,
		inverse: bool,
	}
}

// const { connectStyle } = require("/utils/style")
module.exports = SpinnerElement // connectStyle(SpinnerElement, MODULE_NAME$)
