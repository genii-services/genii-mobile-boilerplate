const MODULE_NAME$ = "elements/InputGroup"
console.debug(MODULE_NAME$)

const React = require("react")
const { View } = require("react-native")

const variables = require("/styles/themes/default")
const { computeProps } = require("/utils/props")
const { connectStyle } = require("/utils/style")

const InputGroup = props => {
	const getInitialStyle = () => {
		return {
			roundedInputGroup: {
				borderWidth: props.rounded ? 1 : undefined,
				borderRadius: props.rounded ? variables.inputGroupRoundedBorderRadius : undefined,
			},
		}
	}

	const prepareRootProps = () => {
		const defaultProps = {
			style: getInitialStyle().roundedInputGroup,
		}

		return computeProps(props, defaultProps)
	}

	return <View {...prepareRootProps()}>{props.children}</View>
}

if (__DEV__) {
	const { array, bool, number, object, oneOfType, string } = require("prop-types")
	const { ViewPropTypes } = require("react-native")
	InputGroup.propTypes = {
		...ViewPropTypes,
		regular: bool,
		underline: bool,
		rounded: bool,
		success: bool,
		error: bool,
		disabled: bool,
	}
}

module.exports = connectStyle(InputGroup, MODULE_NAME$)
