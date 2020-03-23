/** 공통 라이브러리 */
const color = require("color")
const { PixelRatio } = require("react-native")

const { BLACK, FLEX_START, FLEX_END, TRANSPARENT, WHITE } = require("/constants/style")
const { deviceOS, itsIOS } = require("/utils/device")

const platformStyle = undefined

const textColor = BLACK
const inverseTextColor = WHITE

const brandPrimary = itsIOS ? "#007aff" : "#3F51B5"
const brandInfo = "#62B1F6"
const brandSuccess = "#5cb85c"
const brandDanger = "#d9534f"
const brandWarning = "#f0ad4e"

const toolbarDefaultBg = itsIOS ? "#F8F8F8" : "#3F51B5"
const tabBgColor = "#F8F8F8"

const fontSizeBase = 15
const iconFontSize = itsIOS ? 30 : 28

module.exports = {
	platformStyle,
	platform: deviceOS,

	// Accordion
	accordionBorderColor: "#d3d3d3",
	accordionContentPadding: 10,
	accordionIconFontSize: 18,
	contentStyle: "#f5f4f5",
	expandedIconStyle: BLACK,
	headerStyle: "#edebed",
	iconStyle: BLACK,

	// ActionSheet
	elevation: 4,
	containerTouchableBackgroundColor: "rgba(0,0,0,0.4)",
	innerTouchableBackgroundColor: WHITE,
	listItemHeight: 50,
	listItemBorderColor: TRANSPARENT,
	marginHorizontal: -15,
	marginLeft: 14,
	marginTop: 15,
	minHeight: 56,
	padding: 15,
	touchableTextColor: "#757575",

	// Android
	androidRipple: true,
	androidRippleColor: "rgba(256, 256, 256, 0.3)",
	androidRippleColorDark: "rgba(0, 0, 0, 0.15)",
	buttonUppercaseAndroidText: true,

	// Badge
	badgeBg: "#ED1727",
	badgeColor: WHITE,
	badgePadding: itsIOS ? 3 : 0,

	// Button
	buttonFontFamily: itsIOS ? "System" : "Roboto_medium",
	buttonDisabledBg: "#b5b5b5",
	buttonPadding: 6,
	buttonDefaultActiveOpacity: 0.5,
	buttonDefaultFlex: 1,
	buttonDefaultBorderRadius: 2,
	buttonDefaultBorderWidth: 1,
	buttonPrimaryBg: brandPrimary,
	buttonPrimaryColor: inverseTextColor,
	buttonInfoBg: brandInfo,
	buttonInfoColor: inverseTextColor,
	buttonSuccessBg: brandSuccess,
	buttonSuccessColor: inverseTextColor,
	buttonDangerBg: brandDanger,
	buttonDangerColor: inverseTextColor,
	buttonWarningBg: brandWarning,
	buttonWarningColor: inverseTextColor,
	buttonTextSize: itsIOS ? fontSizeBase * 1.1 : fontSizeBase - 1,
	buttonTextSizeLarge: fontSizeBase * 1.5,
	buttonTextSizeSmall: fontSizeBase * 0.8,
	borderRadiusLarge: fontSizeBase * 3.8,
	iconSizeLarge: iconFontSize * 1.5,
	iconSizeSmall: iconFontSize * 0.6,

	// Card
	cardDefaultBg: WHITE,
	cardBorderColor: "#ccc",
	cardBorderRadius: 2,
	cardItemPadding: itsIOS ? 10 : 12,

	// CheckBox
	CheckboxRadius: itsIOS ? 13 : 0,
	CheckboxBorderWidth: itsIOS ? 1 : 2,
	CheckboxPaddingLeft: itsIOS ? 4 : 2,
	CheckboxPaddingBottom: itsIOS ? 0 : 5,
	CheckboxIconSize: itsIOS ? 21 : 16,
	CheckboxIconMarginTop: itsIOS ? undefined : 1,
	CheckboxFontSize: itsIOS ? 23 / 0.9 : 17,
	checkboxBgColor: "#039BE5",
	checkboxSize: 20,
	checkboxTickColor: WHITE,
	checkboxDefaultColor: TRANSPARENT,
	checkboxTextShadowRadius: 0,

	// Color
	brandPrimary,
	brandInfo,
	brandSuccess,
	brandDanger,
	brandWarning,
	brandDark: BLACK,
	brandLight: "#f4f4f4",

	// Container
	containerBgColor: WHITE,

	// Date Picker
	datePickerFlex: 1,
	datePickerPadding: 10,
	datePickerTextColor: BLACK,
	datePickerBg: TRANSPARENT,

	// FAB
	fabBackgroundColor: "blue",
	fabBorderRadius: 28,
	fabBottom: 0,
	fabButtonBorderRadius: 20,
	fabButtonHeight: 40,
	fabButtonLeft: 7,
	fabButtonMarginBottom: 10,
	fabContainerBottom: 20,
	fabDefaultPosition: 20,
	fabElevation: 4,
	fabIconColor: WHITE,
	fabIconSize: 24,
	fabShadowColor: BLACK,
	fabShadowOffsetHeight: 2,
	fabShadowOffsetWidth: 0,
	fabShadowOpacity: 0.4,
	fabShadowRadius: 2,
	fabWidth: 56,

	// Font
	DefaultFontSize: 16,
	fontFamily: itsIOS ? "System" : "System",
	fontSizeBase,
	fontSizeH1: fontSizeBase * 1.8,
	fontSizeH2: fontSizeBase * 1.6,
	fontSizeH3: fontSizeBase * 1.4,

	// Footer
	footerHeight: 55,
	footerDefaultBg: itsIOS ? "#F8F8F8" : "#3F51B5",
	footerPaddingBottom: 0,

	// FooterTab
	tabBarTextColor: itsIOS ? "#6b6b6b" : "#b3c7f9",
	tabBarTextSize: itsIOS ? 14 : 11,
	activeTab: itsIOS ? "#007aff" : WHITE,
	sTabBarActiveTextColor: "#007aff",
	tabBarActiveTextColor: itsIOS ? "#007aff" : WHITE,
	tabActiveBgColor: itsIOS ? "#cde1f9" : "#3F51B5",

	// Header
	toolbarBtnColor: itsIOS ? "#007aff" : WHITE,
	toolbarDefaultBg,
	toolbarHeight: itsIOS ? 64 : 56,
	toolbarSearchIconSize: itsIOS ? 20 : 23,
	toolbarInputColor: itsIOS ? "#CECDD2" : WHITE,
	searchBarHeight: itsIOS ? 30 : 40,
	searchBarInputHeight: itsIOS ? 30 : 50,
	toolbarBtnTextColor: itsIOS ? "#007aff" : WHITE,
	toolbarDefaultBorder: itsIOS ? "#a7a6ab" : "#3F51B5",
	iosStatusbar: itsIOS ? "dark-content" : "light-content",
	statusBarColor: color(toolbarDefaultBg)
		.darken(0.2)
		.hex(),
	darkenHeader: color(tabBgColor)
		.darken(0.03)
		.hex(),

	// Icon
	iconFamily: "Ionicons",
	iconFontSize,
	iconHeaderSize: itsIOS ? 33 : 24,

	// InputGroup
	inputFontSize: 17,
	inputBorderColor: "#D9D5DC",
	inputSuccessBorderColor: "#2b8339",
	inputErrorBorderColor: "#ed2f2f",
	inputHeightBase: 50,
	inputColor: textColor,
	inputColorPlaceholder: "#575757",

	// Line Height
	buttonLineHeight: 19,
	lineHeightH1: 32,
	lineHeightH2: 27,
	lineHeightH3: 22,
	lineHeight: itsIOS ? 20 : 24,
	listItemSelected: itsIOS ? "#007aff" : "#3F51B5",

	// List
	listBg: TRANSPARENT,
	listBorderColor: "#c9c9c9",
	listDividerBg: "#f4f4f4",
	listBtnUnderlayColor: "#DDD",
	listItemPadding: itsIOS ? 10 : 12,
	listNoteColor: "#808080",
	listNoteSize: 13,

	// Progress Bar
	defaultProgressColor: "#E4202D",
	inverseProgressColor: "#1A191B",

	// Radio Button
	radioBtnSize: itsIOS ? 25 : 23,
	radioSelectedColorAndroid: "#3F51B5",
	radioBtnLineHeight: itsIOS ? 29 : 24,
	radioColor: brandPrimary,

	// Segment
	segmentBackgroundColor: itsIOS ? "#F8F8F8" : "#3F51B5",
	segmentActiveBackgroundColor: itsIOS ? "#007aff" : WHITE,
	segmentTextColor: itsIOS ? "#007aff" : WHITE,
	segmentActiveTextColor: itsIOS ? WHITE : "#3F51B5",
	segmentBorderColor: itsIOS ? "#007aff" : WHITE,
	segmentBorderColorMain: itsIOS ? "#a7a6ab" : "#3F51B5",

	// Spinner
	defaultSpinnerColor: "#45D56E",
	inverseSpinnerColor: "#1A191B",

	// Tab
	tabBarDisabledTextColor: "#BDBDBD",
	tabDefaultBg: itsIOS ? "#F8F8F8" : "#3F51B5",
	topTabBarTextColor: itsIOS ? "#6b6b6b" : "#b3c7f9",
	topTabBarActiveTextColor: itsIOS ? "#007aff" : WHITE,
	topTabBarBorderColor: itsIOS ? "#a7a6ab" : WHITE,
	topTabBarActiveBorderColor: itsIOS ? "#007aff" : WHITE,

	// Tabs
	tabBgColor,
	tabFontSize: 15,

	// Text
	textColor,
	inverseTextColor,
	noteFontSize: 14,
	defaultTextColor: textColor,

	// Title
	titleFontfamily: itsIOS ? "System" : "Roboto_medium",
	titleFontSize: itsIOS ? 17 : 19,
	subTitleFontSize: itsIOS ? 11 : 14,
	subtitleColor: itsIOS ? "#8e8e93" : WHITE,
	titleFontColor: itsIOS ? BLACK : WHITE,

	// Other
	borderRadiusBase: itsIOS ? 5 : 2,
	borderWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
	contentPadding: 10,
	dropdownLinkColor: "#414142",
	inputLineHeight: 24,

	inputGroupRoundedBorderRadius: 30,

	// iPhoneX SafeArea
	Inset: {
		portrait: {
			topInset: 24,
			leftInset: 0,
			rightInset: 0,
			bottomInset: 34,
		},
		landscape: {
			topInset: 0,
			leftInset: 44,
			rightInset: 44,
			bottomInset: 21,
		},
	},
}
