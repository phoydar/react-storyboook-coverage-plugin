'use strict'

const config = require('./__mocks__/sample.config.json')
const getExportedModuleNames = require('../src/getExportedModuleNames')

const testDirectoryEmpty = `${__dirname}/__mocks__/directory_empty`
const testDirectory1 = `${__dirname}/__mocks__/directory_1`
const testDirectory2 = `${__dirname}/__mocks__/directory_2`

const walkSyncEntryPointFilesConfig = config.walkSyncEntryPointFilesConfig

const exportedModulesEmpty = getExportedModuleNames(
  testDirectoryEmpty,
  walkSyncEntryPointFilesConfig
)
const exportedModules1 = getExportedModuleNames(testDirectory1, walkSyncEntryPointFilesConfig)
const exportedModules2 = getExportedModuleNames(testDirectory2, walkSyncEntryPointFilesConfig)

test('No exported modules', () => {
  expect(exportedModulesEmpty.length).toBe(0)
})

test('ignored index file in sub_directory', () => {
  expect(exportedModules2.length).toBe(0)
})

test('1 exported module', () => {
  expect(exportedModules1.length).toBe(1)
})
