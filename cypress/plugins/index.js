// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

// https://github.com/bahmutov/cypress-skip-and-only-ui

const path = require('path')
const fs = require('fs-extra')

function getConfigurationByFile(file) {
	const pathToConfigFile = path.resolve('cypress', 'config', `${file}.json`)
	return fs.readJson(pathToConfigFile)
}

module.exports = (on, config) => {
	const file = config.env.configFile || './prod' //nastaveni kde chci pustit testy
						// (varianty: "beta", "prod", ....)
	return getConfigurationByFile(file)
}
