const walkSync = require('walk-sync');

const config = require('./config.json');

const testDirectory = config.testDirectory;


const getFilePaths = (dir, walkSyncConfig) => {
  const entrypointFileList = walkSync(testDirectory, walkSyncConfig);

  let allFilePaths = [];

  entrypointFileList.forEach((file) => {
    const fullPath = `${dir}/${file}`;

    allFilePaths.push(fullPath);
  });

  return allFilePaths;
};

module.exports = getFilePaths;
