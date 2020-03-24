/** Element Style */
const { BLACK, FLEX_START, FLEX_END, NOWRAP, SPACE_BETWEEN, TRANSPARENT } = require("/constants/style")
const defaultThemeStyle = require("/styles/themes/default")

module.exports = (style = defaultThemeStyle) => {
	const {
		borderWidth: borderWidth,
		cardBorderRadius: borderRadius,
		cardBorderColor: borderColor,
		cardDefaultBg: backgroundColor,
	} = style

	return {
		".transparent": {
			shadowColor: null,
			shadowOffset: null,
			shadowOpacity: null,
			shadowRadius: null,
			elevation: null,
			backgroundColor: TRANSPARENT,
			borderWidth: 0,
		},
		".noShadow": {
			shadowColor: null,
			shadowOffset: null,
			shadowOpacity: null,
			elevation: null,
		},
		marginVertical: 5,
		marginHorizontal: 2,
		borderWidth,
		borderRadius,
		borderColor,
		flexWrap: NOWRAP,
		backgroundColor,
		shadowColor: BLACK,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 1.5,
		elevation: 3,
	}
}
