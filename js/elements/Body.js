const MODULE_NAME$ = "BodyElement"
console.debug(MODULE_NAME$)

const { View } = require("react-native")

const BodyElement = props => <View {...props}/>
BodyElement.displayName = "Body"

// const { connectStyle } = require("/utils/style")
module.exports = BodyElement //connectStyle(BodyElement, MODULE_NAME$)
