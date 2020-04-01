const MODULE_NAME$ = "HeaderElement"
console.debug(MODULE_NAME$)

/* eslint-disable no-nested-ternary */
/* eslint-disable no-unneeded-ternary */
const _ = require("lodash")
const React = require("react")
const { View, StatusBar } = require("react-native")

const { screen, itsIphoneX } = require("/utils/device")
const { connectStyle } = require("/utils/style")
const { forwardRef, useState, useStore } = require("/hooks")
const { useStyle } = require("/coordinators")

const Header = props => {
	const { androidStatusBarColor, iosBarStyle, style, transparent, translucent } = props

	const { defaultStyle } = useStyle(MODULE_NAME$, { iosBarStyle, style }, defaultStyle => {
		let iphoneXStyle
		if (itsIphoneX) {
			const style = StyleSheet.flatten(props.style)
			const inset = defaultStyle.Inset
			const InsetValues = screen.isPortrait() ? inset.portrait : inset.landscape
			const oldHeight = style.height || style[1] ? style[1].height || style[0].height : style[0].height
			const height = oldHeight + InsetValues.topInset
			const paddingTop =
				style.paddingTop || style.padding
					? (style.paddingTop ? style.paddingTop : _.get(style, "padding", 0)) + InsetValues.topInset
					: InsetValues.topInset
			iphoneXStyle = [style, { height, paddingTop }]
		}
		return {
			bar: iosBarStyle || defaultStyle.name === "material" ? "light-content" : defaultStyle.iosStatusbar,
			iphoneX: iphoneXStyle,
		}
	})

	return (
		<View>
			<StatusBar
				backgroundColor={androidStatusBarColor || defaultStyle.statusBarColor}
				barStyle={stylez.bar}
				translucent={transparent ? true : translucent}
			/>
			{itsIphoneX ? <View {...props} style={stylez.iphoneX} /> : <View {...props} />}
		</View>
	)
}

if (__DEV__) {
	const { array, bool, number, object, oneOfType, ViewPropTypes } = require("/utils/propTypes")
	Header.propTypes = {
		...ViewPropTypes,
		style: oneOfType([object, number, array]),
		searchBar: bool,
		rounded: bool,
	}
}

module.exports = Header //connectStyle(Header, MODULE_NAME$)
