'use strict'

const config = require('../src/config.json')
const getAllStoryBookFiles = require('../src/getAllStoryBookFiles')

const testDirectory1 = `${__dirname}/__mocks__/directory_1`
const testDirectory2 = `${__dirname}/__mocks__/directory_2`
const testDirectory3 = `${__dirname}/__mocks__/directory_3`

const walkSyncStoryBookFilesConfig = config.walkSyncStoryBookFilesConfig

const allStoryBookFiles1 = getAllStoryBookFiles(testDirectory1, walkSyncStoryBookFilesConfig)
const allStoryBookFiles2 = getAllStoryBookFiles(testDirectory2, walkSyncStoryBookFilesConfig)
const allStoryBookFiles3 = getAllStoryBookFiles(testDirectory3, walkSyncStoryBookFilesConfig)

test('No stories found', () => {
  expect(allStoryBookFiles1.length).toBe(0)
})

test('1 story found', () => {
  expect(allStoryBookFiles2.length).toBe(1)
})

test('2 stories found', () => {
  expect(allStoryBookFiles3.length).toBe(2)
})
