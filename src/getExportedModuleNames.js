'use strict'

const fs = require('fs')

const config = require('../src/config.json')
const getFilePaths = require('../src/getFilePaths')

const getExportedModuleNames = (testDirectory, walkSyncEntryPointFilesConfig) => {
  let allFilePaths = getFilePaths(testDirectory, walkSyncEntryPointFilesConfig)
  let allLines = getAllLines(allFilePaths)
  let allExportedModules = getModuleNames(allLines)

  allExportedModules = allExportedModules.filter(module => {
    if (!config.ignoredExportedModules.includes(module)) {
      return module
    }
  })

  return allExportedModules
}

const getModuleNames = allLines => {
  let filteredLines = allLines.filter(line => {
    let isValidExport = !line.includes('*') && !line.includes('//')

    if (isValidExport) {
      return line
    }
  })

  let matches = filteredLines.map(line => {
    const match = line.match(/export { (.*) }/)

    return match[1].split(', ')
  })

  var merged = [].concat.apply([], matches)

  return merged
}

const getAllLines = allFilePaths => {
  let allLines = []

  allFilePaths.forEach(filePath => {
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const linesArray = fileContents
      .replace(/\n\s/g, '')
      .replace(/,\n/, ' ')
      .split('\n')

    linesArray.forEach(line => {
      if (line) {
        allLines.push(line)
      }
    })
  })

  return allLines
}

module.exports = getExportedModuleNames
