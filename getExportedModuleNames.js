const fs = require('fs');

const config = require('./config.json');
const getFilePaths = require('./getFilePaths');

const walkSyncEntryPointFilesConfig = config.walkSyncEntryPointFilesConfig;

const entrypointFiles = (dir) => {
  let allFilePaths = getFilePaths(dir, walkSyncEntryPointFilesConfig);
  let allLines = getAllLines(allFilePaths);
  let exportedModuleNames = getModuleNames(allLines);

  return exportedModuleNames;
};

const getModuleNames = allLines => {
  const exportNameRegex = /export {(.*)}/;

  let moduleNames = [];

  allLines.forEach(line => {
    const match = line.match(exportNameRegex);
    const moduleName = match[1].trim();

    if(!config.ignoredExportedModules.includes(moduleName)){
      moduleNames.push(moduleName);
    }
  });

  return moduleNames;
}

const getAllLines = allFilePaths => {
  let allLines = [];

  allFilePaths.forEach(filePath => {
    const linesArray = fs.readFileSync(filePath, 'utf8').split('\n');

    linesArray.forEach(line => {
      if(line){
        allLines.push(line);
      }
    });
  });

  return allLines;
}

module.exports = entrypointFiles;