const walkSync = require('walk-sync');

const getFilePaths = require('../getFilePaths');

const testDirectoryEmpty = `${__dirname}/__mocks__/directory_empty`;
const testDirectory1 = `${__dirname}/__mocks__/directory_1`;
const testDirectory2 = `${__dirname}/__mocks__/directory_2`;
const testDirectory3 = `${__dirname}/__mocks__/directory_3`;

const fileListEmpty = getFilePaths(testDirectoryEmpty, {});
const fileList1 = getFilePaths(testDirectory1, {});
const fileList2 = getFilePaths(testDirectory2, {});
const fileList3 = getFilePaths(testDirectory3, {});

test('file paths array to be empty', () => {
  expect(fileListEmpty.length).toBe(0);
});

test('file paths array to be 1', () => {
  expect(fileList1.length).toBe(1);
});

test('file paths array to be 4', () => {
  expect(fileList2.length).toBe(4);
});

test('file paths array to be 8', () => {
  expect(fileList3.length).toBe(8);
});

