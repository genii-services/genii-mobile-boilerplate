const MODULE_NAME$ = "BadgeElement"
console.debug(MODULE_NAME$)

const { View } = require("react-native")
const { connectStyle } = require("/utils/style")

const BadgeElement = View

module.exports = BadgeElement //connectStyle(BadgeElement, MODULE_NAME$)
