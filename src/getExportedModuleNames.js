'use strict'

const fs = require('fs')

const config = require('../src/config.json')
const getFilePaths = require('../src/getFilePaths')

const getExportedModuleNames = (testDirectory, walkSyncEntryPointFilesConfig) => {
  let allFilePaths = getFilePaths(testDirectory, walkSyncEntryPointFilesConfig)
  let allLines = getAllLines(allFilePaths)
  let exportedModuleNames = getModuleNames(allLines)

  return exportedModuleNames
}

const getModuleNames = allLines => {
  const exportNameRegex = /export {(.*)}/

  let moduleNames = []

  allLines.forEach(line => {
    const match = line.match(exportNameRegex)
    let moduleName;

    if(match){
      moduleName = match[1].trim()
    }

    if (moduleName && !config.ignoredExportedModules.includes(moduleName)) {
      console.log(`module name: ${moduleName}`);
      moduleNames.push(moduleName)
    }
  })

  return moduleNames
}

const getAllLines = allFilePaths => {
  let allLines = []

  allFilePaths.forEach(filePath => {
    const linesArray = fs.readFileSync(filePath, 'utf8').split('\n')

    linesArray.forEach(line => {
      if (line) {
        allLines.push(line)
      }
    })
  })

  return allLines
}

module.exports = getExportedModuleNames