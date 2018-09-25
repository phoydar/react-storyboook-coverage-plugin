module.exports = {
  "testDirectory": "/Users/USER/src/code",
  "ignoredExportedModules": [
    "ExportedModule",
    "AnotherExportedModule"
  ],
  "walkSyncStoryBookFilesConfig": {
    "globs": [
      "**/*.stories.js"
    ]
  },
  "walkSyncEntryPointFilesConfig": {
    "globs": [
      "**/index.js"
    ],
    "ignore": [
      "some-dir/index.js"
    ]
  }
}
