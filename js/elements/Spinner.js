const MODULE_NAME$ = "elements/Spinner"
console.debug(MODULE_NAME$)

const React = require("react")
const { ActivityIndicator } = require("react-native")

const { connectStyle } = require("/utils/style")
const { useState, useStore, useThis } = require("/hooks")

const Spinner = ({ color, ...props }) => {
	const [theme] = useStore("theme")

	const style = theme["@@shoutem.theme/themeStyle"].defaultStyle
	return (
		<ActivityIndicator
			{...props}
			color={color ? color : props.inverse ? style.inverseSpinnerColor : style.defaultSpinnerColor}
			size={props.size || "large"}
		/>
	)
}

if (__DEV__) {
	const { array, bool, number, object, oneOfType, string } = require("/utils/propTypes")

	Spinner.propTypes = {
		...ActivityIndicator.propTypes,
		color: string,
		inverse: bool,
	}
}

module.exports = connectStyle(Spinner, MODULE_NAME$)
