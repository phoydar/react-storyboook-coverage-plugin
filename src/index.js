'use strict'
const chalk = require('chalk')
const cosmiconfig = require('cosmiconfig')
const merge = require('lodash/merge')

const round = require('./round')
const defaultConfig = require('./config.json')
const getExportedModuleNames = require('./getExportedModuleNames')
const getAllStorybookFiles = require('./getAllStoryBookFiles')

// get user defined config
const explorer = cosmiconfig('reactStorybookCoverage')
const userConfig = explorer.searchSync()

// default config options
const config = merge(defaultConfig, (userConfig || {}).config)

const arg = process.argv[2];
const isVerbose = ['-v', '--verbose'].includes(arg)

const testDirectory = `${config.testDirectory}`
const walkSyncStoryBookFilesConfig = config.walkSyncStoryBookFilesConfig
const walkSyncEntryPointFilesConfig = config.walkSyncEntryPointFilesConfig

const allStoryBookFiles = getAllStorybookFiles(testDirectory, walkSyncStoryBookFilesConfig)
const exportedModules = getExportedModuleNames(testDirectory, walkSyncEntryPointFilesConfig)

let storyWithNoExport = []
let exportedAndHasStory = []
let storybookFileExportedFileDifference = 0
let coveragePercentage = 0
let coverageStyling = ''
let uncoveredComponents = []

module.exports = () => {
  exportedModules.forEach(exportedModule => {
    if (allStoryBookFiles.includes(exportedModule)) {
      exportedAndHasStory.push(exportedModule)
    } else {
      uncoveredComponents.push(exportedModule)
    }
  })

  allStoryBookFiles.forEach(storyBookFile => {
    if (!exportedModules.includes(storyBookFile)) {
      storyWithNoExport.push(storyBookFile)
    }
  })

  storybookFileExportedFileDifference = storyWithNoExport.length
  coveragePercentage = round((exportedAndHasStory.length / exportedModules.length) * 100, 2)

  coverageStyling = coveragePercentage < config.passingCoveragePercentage ? 'bold.red' : 'bold.green'

  if (isVerbose) {
    console.log(chalk `
{bold Storybook Coverage Report}
--------------------------------------
{${coverageStyling} Storybook Coverage: ${coveragePercentage}}
Storybook Files: {bold ${allStoryBookFiles.length}}
Exported modules: {bold ${exportedModules.length}}
Exported and has a story: {bold ${exportedAndHasStory.length}}
    `)

    if (uncoveredComponents) {
      console.log(chalk `
{bold Modules without stories}
--------------------------------------
${uncoveredComponents.join('\n')}
      `)
    }

    if (storybookFileExportedFileDifference) {
      console.warn(chalk `
{yellow.bold You have ${storybookFileExportedFileDifference} Storybook file(s) \nwith no corresponding export}
--------------------------------------
${storyWithNoExport.join('\n')}
      `)
    }
  } else {
    console.log(chalk `{${coverageStyling} Storybook Coverage: ${coveragePercentage}%}`)
  }

  if (coveragePercentage < config.passingCoveragePercentage) {
    console.log(chalk `{white.bold.bgRed  STORYBOOK COVERAGE MUST BE 100% IN ORDER TO PUSH TO REMOTE!!! }
Use the flag {bold.magenta  --no-verify } to override the pre-push hook
    `)
    process.exit(1)
  }
}