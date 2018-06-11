const config = require('./config.json');
const getFilePaths = require('./getFilePaths');

const walkSyncStoryBookFilesConfig = config.walkSyncStoryBookFilesConfig;

const getAllStoryBookFiles = testDirectory => {
  let allFilePaths = getFilePaths(testDirectory, walkSyncStoryBookFilesConfig);
  let allStorybookNames = [];

  allFilePaths.forEach(filePath => {
    const regex = /.*\/(.*).stories.js$/;

    const match = filePath.match(regex);

    if(match){
      allStorybookNames.push(match[1]);
    }
  });

  return allStorybookNames;
};

module.exports = getAllStoryBookFiles;
