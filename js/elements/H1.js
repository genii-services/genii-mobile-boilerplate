const MODULE_NAME$ = "H1Element"
console.debug(MODULE_NAME$)

const { Text } = require("react-native")

const { connectStyle } = require("/utils/style")

const H1Element = Text

module.exports = H1Element //connectStyle(H1Element, MODULE_NAME$)
