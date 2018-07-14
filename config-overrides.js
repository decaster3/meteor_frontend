const rewireCssModules = require("react-app-rewire-css-modules")
const {rewireEmotion} = require("react-app-rewire-emotion")

module.exports = function override(config, env) {
  config = rewireCssModules(config, env)
  config = rewireEmotion(config, env)

  return config
}
