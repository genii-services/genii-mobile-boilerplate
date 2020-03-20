const _ = require("lodash")
const customMerge = require("./customMerge")

/**
 * Matches any style properties that represent component style variants.
 * Those styles can be applied to the component by using the styleName
 * prop. All style variant property names must start with a single '.'
 * character, e.g., '.variant'.
 *
 * @param propertyName The style property name.
 * @returns {boolean} True if the style property represents a component variant, false otherwise.
 */
function isStyleVariant(propertyName) {
	return /^\./.test(propertyName)
}

/**
 * Matches any style properties that represent style rules that target the
 * component children. Those styles can have two formats, they can either
 * target the components by component name ('shoutem.ui.Text'), or by component
 * name and variant ('shoutem.ui.Text.line-through'). Beside specifying the
 * component name, those styles can also target any component by using the
 * '*' wildcard ('*', or '*.line-through'). The rule to identify those styles is
 * that they have to contain a '.' character in their name or be a '*'.
 *
 * @param propertyName The style property name.
 * @returns {boolean} True if the style property represents a child style, false otherwise.
 */
function isChildStyle(propertyName) {
	return /(^[^\.].*\.)|^\*$/.test(propertyName)
}

/**
 * Splits the style into its parts:
 * component style - concrete style that needs to be applied to a component
 * style variants - variants that can be applied to a component by using styleName prop
 * children style - style rules that need to be propagated to component children
 *
 * @param style The style to split.
 * @returns {*} An object with the componentStyle, styleVariants, and childrenStyle keys.
 */
function splitStyle(style) {
	return _.reduce(
		style,
		(result, value, key) => {
			let styleSection = result.componentStyle
			if (isStyleVariant(key)) {
				styleSection = result.styleVariants
			} else if (isChildStyle(key)) {
				styleSection = result.childrenStyle
			}
			styleSection[key] = value
			return result
		},
		{
			componentStyle: {},
			styleVariants: {},
			childrenStyle: {},
		}
	)
}

/**
 * Resolves the final component style by merging all of the styles that can be
 * applied to a component in the proper order.
 *
 * This function extracts the applicable parts of the theme, parent and element
 * styles, and merges the styles that target the component, and component variants
 * with those styles to get the final style.
 *
 * The styles are merged in the following order, where the styles with the
 * higher index override the styles with the lower one:
 * 1. Theme component style
 * 2. Parent component style
 * 3. Theme style variants specified through styleName
 * 4. Parent style variants specified through styleName
 * 5. Element style passed through the style prop
 *
 * @param componentName The component name ('shoutem.ui.Text')
 * @param styleName Style names ('large rounded')
 * @param themeStyle The theme style that should include the theme and base component style
 * @param parentStyle The style rules inherited from the parent component
 * @param elementStyle The style passed through the style prop of the component
 * @returns {{componentStyle, childrenStyle}} The resolved component and children styles.
 */
export function resolveComponentStyle(componentName, styleNames = [], themeStyle = {}, parentStyle = {}) {
	// const mergedStyle = _.merge({},
	//   themeStyle,
	//   parentStyle['*'],
	//   parentStyle[componentName],
	//   ..._.map(styleNames, (sn) => themeStyle[`.${sn}`]),
	//   ..._.map(styleNames, (sn) => parentStyle[`*.${sn}`]),
	//   ..._.map(styleNames, (sn) => parentStyle[`${componentName}.${sn}`])
	// );

	let mergedStyle = customMerge(themeStyle, parentStyle[componentName])
	styleNames.forEach((sn, index) => {
		mergedStyle = customMerge(mergedStyle, themeStyle[`${sn}`])
	})

	styleNames.forEach((sn, index) => {
		mergedStyle = customMerge(mergedStyle, parentStyle[`${componentName}${sn}`])
	})

	// Phase 2: merge the component styles, this step is performed by using the
	// style from phase 1, so that we are sure that the final style variants are
	// applied to component style.
	// const resolvedStyle = _.merge({},
	//   mergedStyle,
	//   parentStyle['*'],
	//   parentStyle[componentName],
	//   ..._.map(styleNames, (sn) => mergedStyle[`.${sn}`]),
	//   ..._.map(styleNames, (sn) => parentStyle[`*.${sn}`]),
	//   ..._.map(styleNames, (sn) => parentStyle[`${componentName}.${sn}`])
	// );

	let resolvedStyle = customMerge(mergedStyle, parentStyle[componentName])

	styleNames.forEach((sn, index) => {
		resolvedStyle = customMerge(resolvedStyle, mergedStyle[`${sn}`])
	})

	styleNames.forEach((sn, index) => {
		resolvedStyle = customMerge(resolvedStyle, parentStyle[`${componentName}${sn}`])
	})

	return resolvedStyle
}
