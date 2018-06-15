'use strict'

const walkSync = require('walk-sync')

const getFilePaths = (testDirectory, walkSyncConfig) => {
  const fileList = walkSync(testDirectory, walkSyncConfig)

  let allFilePaths = []

  fileList.forEach(file => {
    const fullPath = `${testDirectory}/${file}`

    allFilePaths.push(fullPath)
  })

  return allFilePaths
}

module.exports = getFilePaths
