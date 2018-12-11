'use strict'

const getFilePaths = require('../src/getFilePaths')

const getAllStoryBookFiles = (testDirectory, walkSyncStoryBookFilesConfig) => {
  let allFilePaths = getFilePaths(testDirectory, walkSyncStoryBookFilesConfig)
  let allStorybookNames = []

  allFilePaths.forEach(filePath => {
    const regex = /.*\/(.*).stories.js$/

    const match = filePath.match(regex)

    allStorybookNames.push(match[1])
  })

  return allStorybookNames
}

module.exports = getAllStoryBookFiles
