const MODULE_NAME$ = "H3Element"
console.debug(MODULE_NAME$)

const { Text } = require("react-native")

const H3Element = props => <Text {...props}/>

H3Element.displayName = "H3"

// const { connectStyle } = require("/utils/style")
module.exports = H3Element //connectStyle(H3Element, MODULE_NAME$)
