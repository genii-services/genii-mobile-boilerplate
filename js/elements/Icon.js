const MODULE_NAME$ = "IconElement"
console.debug(MODULE_NAME$)

const React = require("react")
const _ = require("lodash")
const AntDesign = require("react-native-vector-icons/AntDesign").default
const Entypo = require("react-native-vector-icons/Entypo").default
const EvilIcons = require("react-native-vector-icons/EvilIcons").default
const Feather = require("react-native-vector-icons/Feather").default
const FontAwesome = require("react-native-vector-icons/FontAwesome").default
const FontAwesome5 = require("react-native-vector-icons/FontAwesome5").default
const Foundation = require("react-native-vector-icons/Foundation").default
const Ionicons = require("react-native-vector-icons/Ionicons").default
const MaterialCommunityIcons = require("react-native-vector-icons/MaterialCommunityIcons").default
const MaterialIcons = require("react-native-vector-icons/MaterialIcons").default
const Octicons = require("react-native-vector-icons/Octicons").default
const SimpleLineIcons = require("react-native-vector-icons/SimpleLineIcons").default
const Zocial = require("react-native-vector-icons/Zocial").default

const iosIconz = require("/data/iconz.ios.json")
const androidIconz = require("/data/iconz.android.json")
const { itsAndroid, itsIOS } = require("/utils/device")
const { connectStyle } = require("/utils/style")
const { forwardRef, useStore, useThis } = require("/hooks")

const IconFamilez = {
	AntDesign,
	Entypo,
	EvilIcons,
	Feather,
	FontAwesome,
	FontAwesome5,
	Foundation,
	Ionicons,
	MaterialCommunityIcons,
	MaterialIcons,
	Octicons,
	SimpleLineIcons,
	Zocial,
}

const defaultIconFamilyName = "Ionicons"

const IconElement = forwardRef(({ type, name, android, ios, active, size, color }, ref) => {
	const _this = useThis()
	const [theme] = useStore("theme")
	const defaultStyle = theme["@@shoutem.theme/themeStyle"].defaultStyle

	if (_this.isChangedProps("Icon,name", { type, name, android, ios, active })) {
		const { itsUnitedStyle } = defaultStyle
		if (ios && itsIOS) name = ios
		if (android && itsAndroid) name = android
		if (!name) name = defaultIconName
		if (!type) {
			const a = _.split(name, ".")
			switch (a.length) {
				case 0:
				case 1:
					type = defaultStyle.iconFamily || defaultIconFamilyName
					const o = itsIOS && !itsUnitedStyle ? iosIconz[name] : androidIconz[name]
					if (o) name = typeof o === "object" ? (active ? o.active : o.default) : o
					break
				case 2:
					type = a[0]
					name = a[1]
					break
				default:
					type = a[0]
					name = name.substr(type.length + 1)
					break
			}
		}
		_this.Icon = IconFamilez[type]
		_this.name = name
		// console.debug(MODULE_NAME$, _this.prevProps?.type, _this.prevProps?.name, type, name)
	}
	if (!size) size = defaultStyle.iconSize
	if (!color) color = defaultStyle.iconColor

	return <_this.Icon ref={ref} name={_this.name} size={size} color={color} />
})

if (__DEV__) {
	const { array, bool, number, object, oneOf, oneOfType, string } = require("/utils/propTypes")
	IconElement.propTypes = {
		android: string,
		active: bool,
		ios: string,
		name: string,
		style: oneOfType([object, number, array]),
		type: oneOf(_.keys(IconFamilez)), // string
	}
}

exports = module.exports = IconElement //connectStyle(IconElement, MODULE_NAME$)
exports.AntDesign = AntDesign
exports.Entypo = Entypo
exports.EvilIcons = EvilIcons
exports.Feather = Feather
exports.FontAwesome = FontAwesome
exports.FontAwesome5 = FontAwesome5
exports.Foundation = Foundation
exports.Ionicons = Ionicons
exports.MaterialCommunityIcons = MaterialCommunityIcons
exports.MaterialIcons = MaterialIcons
exports.Octicons = Octicons
exports.SimpleLineIcons = SimpleLineIcons
exports.Zocial = Zocial
