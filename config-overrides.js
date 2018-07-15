const rewireCssModules = require("react-app-rewire-css-modules")
const {rewireEmotion} = require("react-app-rewire-emotion")
const rewirePolished = require("react-app-rewire-polished")

module.exports = function override(config, env) {
  config = rewireCssModules(config, env)
  config = rewirePolished(config, env)
  config = rewireEmotion(config, env)

  return config
}
