const _ = require("lodash")
const { StyleSheet } = require("react-native")

const Theme = require("./Theme")
const { ThemeShape } = Theme
const { resolveComponentStyle } = require("./resolveComponentStyle")

const { useState, useThis } = require("/hooks")

const StyledComponent = props => {
	const { mapPropsToStyleNames, options } = props
	const getStyleNames = props => {
		const styleNamesArr = _.map(props, (value, key) => (typeof value !== "object" && value === true ? "." + key : false))
		_.remove(styleNamesArr, (value, index) => value === false)
		return styleNamesArr
	}

	const getFinalStyle = (props, context, style, styleNames) => {
		let resolvedStyle = {}
		if (context.parentPath) {
			resolvedStyle = getOrSetStylesInCache(context, props, styleNames, [
				...context.parentPath,
				componentStyleName,
				...styleNames,
			])
		} else {
			resolvedStyle = resolveStyle(context, props, styleNames)
			themeCache[componentStyleName] = resolvedStyle
		}

		const concreteStyle = getConcreteStyle(_.merge({}, resolvedStyle))

		return _.isArray(style)
			? [concreteStyle, ...style]
			: typeof style == "number" || typeof style == "object"
			? [concreteStyle, style]
			: concreteStyle
	}

	const _this = useThis()

	// console.log(context.parentPath);
	const styleNames = getStyleNames(props)
	const style = props.style

	const [_style, set_style] = useState(() => getFinalStyle(props, context, style, styleNames))
	// AddedProps are additional WrappedComponent props
	// Usually they are set trough alternative ways,
	// such as theme style, or trough options
	const [_addedProps] = useState(() => {
		const addedProps = {}
		if (options.withRef) addedProps.ref = "wrappedInstance"
		return addedProps
	})
	const [_styleNames, set_styleNames] = useState(styleNames)

	if (shouldRebuildStyle(props, nextContext, styleNames)) {
		const finalStyle = getFinalStyle(nextProps, nextContext, style, styleNames)
		set_style(finalStyle)
		// set_style(childrenStyle(resolvedStyle.childrenStyle)
		set_styleNames(styleNames)
	}

	const getChildContext = () => {
		parentPath: !context.parentPath ? [componentStyleName] : [...context.parentPath, componentStyleName, ...getStyleNames(props)]
		// parentStyle: props.virtual ? context.parentStyle : _childrenStyle,
		// resolveStyle: resolveConnectedComponentStyle,
	}

	const setNativeProps = nativeProps => wrappedInstance.setNativeProps && wrappedInstance.setNativeProps(nativeProps)

	const setWrappedInstance = component => {
		refs._root = component && component._root ? component._root : component
		_this.wrappedInstance = refs._root
	}

	const hasStyleNameChanged = (nextProps, styleNames) => {
		return (
			mapPropsToStyleNames &&
			props !== nextProps &&
			// Even though props did change here,
			// it doesn't necessary means changed props are those which affect styleName
			!_.isEqual(_styleNames, styleNames)
		)
	}

	const shouldRebuildStyle = (nextProps, nextContext, styleNames) => {
		return (
			nextProps.style !== props.style ||
			nextProps.styleName !== props.styleName ||
			nextContext.theme !== context.theme ||
			!_.isEqual(nextContext.parentPath, context.parentPath) ||
			hasStyleNameChanged(nextProps, styleNames)
		)
	}

	const resolveStyleNames = props => {
		const { styleName } = props
		const styleNames = styleName ? styleName.split(/\s/g) : []
		if (!mapPropsToStyleNames) return styleNames
		// We only want to keep the unique style names
		return _.uniq(mapPropsToStyleNames(styleNames, props))
	}

	const getOrSetStylesInCache = (context, props, styleNames, path) => {
		if (themeCache && themeCache[path.join(">")]) return themeCache[path.join(">")]

		const resolvedStyle = resolveStyle(context, props, styleNames)
		if (Object.keys(themeCache).length < 10000) themeCache[path.join(">")] = resolvedStyle
		return resolvedStyle
	}

	const resolveStyle = (context, props, styleNames) => {
		const theme = getTheme(context)
		const themeStyle = theme.createComponentStyle(componentStyleName, componentStyle)
		const parentStyle = context.parentPath
			? themeCache[context.parentPath.join(">")]
			: resolveComponentStyle(componentStyleName, styleNames, themeStyle)
		return resolveComponentStyle(componentStyleName, styleNames, themeStyle, parentStyle)
	}

	/**
	 * 하위 구성요소에 제공되는 핼퍼함수로써 모든 속성 값 세트의 스타일을 확인할 수 있음
	 *
	 * @param props 스타일 값을 해석하는 데 사용하는 컴포넌트 속성
	 * @returns {*} 해석된 컴포넌트 스타일
	 */
	const resolveConnectedComponentStyle = props => {
		const styleNames = resolveStyleNames(props)
		return resolveStyle(context, props, styleNames).componentStyle
	}

	return <WrappedComponent {...props} {..._addedProps} style={_style} ref={setWrappedInstance} />
}

if (__DEV__) {
	const { array, bool, func, number, object, oneOfType, string } = require("prop-types")

	StyledComponent.contextTypes = {
		theme: ThemeShape,
		// The style inherited from the parent
		// parentStyle: object,
		parentPath: array,
	}

	StyledComponent.childContextTypes = {
		// Provide the parent style to child components
		// parentStyle: object,
		// resolveStyle: func,
		parentPath: array,
	}

	StyledComponent.propTypes = {
		// Element style that overrides any other style of the component
		style: oneOfType([object, number, array]),
		// The style variant names to apply to this component, multiple variants may be separated with a space character
		styleName: string,
		// 가상요소는 부모스타일을 자녀에게 전파합니다. 즉, 자녀는 가상요소의 부모 바로 아래에 배치될 때 동작함
		virtual: bool,
	}
}

module.exports = StyledComponent
