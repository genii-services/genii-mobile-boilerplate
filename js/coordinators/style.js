const $MODULE_NAME = "StyleCoordinator"
console.debug($MODULE_NAME)

const _ = require("lodash")
const React = require("react")
const { StyleSheet } = require("react-native")
const { setCustomText, setCustomTextInput } = require("react-native-global-props")

const { FUNCTION, OBJECT, STRING } = require("/constants")
const { BLACK, CENTER, TRANSPARENT, WHITE } = require("/constants/style")
const { isEqual } = require("/utils/object")
const { globalStore, useState, useStore } = require("/hooks")
const { assign, getName, parseJson } = require("/utils")
const storage = require("/interactors/storage")

// 초기값

const fontSizesIndex = 2
const defaultStyle = { fontSizesIndex }
// 캐싱한 스타일
const styleCachez = {}
const styleConditionz = {}

const resetStyleCaches = () => {
	_.forEach(require("styles/themes"), (v, k) => (styleConditionz[k + "Theme"] = typeof v === FUNCTION ? v(defaultStyle) : v))
	const defaultTheme = (styleConditionz.defaultTheme = styleConditionz.lightTheme)
	_.forEach(require("styles/elements"), (v, k) => (styleConditionz[k + "Element"] = typeof v === FUNCTION ? v(defaultTheme) : v))
	_.forEach(require("styles/viewparts"), (v, k) => (styleConditionz[k + "Viewpart"] = typeof v === FUNCTION ? v(defaultTheme) : v))
	_.forEach(require("styles/screens"), (v, k) => (styleConditionz[k + "Screen"] = typeof v === FUNCTION ? v(defaultTheme) : v))
}

const { fontFamily, fontSizesArray, colors, grayscaleColors, backgroundColors } = defaultTheme

const fontSizes = fontSizesArray[fontSizesIndex]
const stylez = {
	colors,
	grayscaleColors,
	backgroundColors,
	fontSizesIndex,
	fontSizes,

	customText: {
		style: {
			fontFamily,
			fontSize: fontSizes[5],
		},
	},
	customTextInput: {
		style: {
			fontFamily,
			paddingTop: 0,
			paddingBottom: 0,
			paddingLeft: 0,
			paddingRight: 0,
		},
		underlineColorAndroid: TRANSPARENT,
	},
}

const useStyle = (target, conditionz, initialStyle) => {
	const [store, setStore] = useStore("style")
	if (store) return

	const value = {
		getStyle,
		setFontFamily,
		setFontSizesIndex,
	}

	storage.load($MODULE_NAME, (data) => {
		assign(stylez, data)
		setFontSizesIndex(stylez.fontSizesIndex)
	})

	const resetCache = () => (styleCachez = {})

	const setFontFamily = (fontFamily) => {
		stylez.fontFamily = fontFamily
		let { customText, customTextInput } = stylez
		customText.style.fontFamily = fontFamily
		customTextInput.style.fontFamily = fontFamily
		setCustomText(customText)
		setCustomTextInput(customTextInput)
		resetCache()
	}

	const setFontSizesIndex = (i) => {
		store.fontSizesIndex = i
		stylez.fontSizes = fontSizesArray[i]
		let { customText } = stylez
		customText.style.fontSize = fontSizesfontSizes[5]
		setCustomText(customText)
		resetCache()
	}

	const getStyle = (target, conditionz, initialStyle) => {
		const name = getName(target)
		let stylez = isEqual(styleConditionz[name], conditionz) && styleCachez[name]
		if (stylez) return stylez

		if (!initialStyle)
			initialStyle =
				target.getDefaultStyle ||
				target.defaultStyle ||
				target.getDefaultStyle ||
				target.defaultStyles ||
				target.style ||
				target.styles2

		switch (typeof initialStyle) {
			case OBJECT:
				break
			case FUNCTION:
				initialStyle = initialStyle(defaultTheme)
				break
			case STRING:
				initialStyle = parseJson(initialStyle)
				break
			default:
				initialStyle = {}
		}

		styleConditionz[name] = conditionz
		stylez = styleCachez[name] = StyleSheet.create(style)
		return stylez
	}

	const stylez = target ? getStyle(target, conditionz, initialStyle) : stylez

	return {
		stylez,
		getStyle,
		fontSizesIndex,
		setFontFamily,
		setFontSizesIndex,
	}
}

module.exports = {
	useStyle,
}
