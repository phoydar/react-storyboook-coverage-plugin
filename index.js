const fs = require('fs');
const walkSync = require('walk-sync');
const chalk = require('chalk');

const round = require('./round');
const config = require('./config.json');
const getExportedModuleNames = require('./getExportedModuleNames');
const getAllStorybookFiles = require('./getAllStoryBookFiles');

const testDirectory = config.testDirectory;

const exportedModules = getExportedModuleNames(testDirectory);
const allStoryBookFiles = getAllStorybookFiles(testDirectory);

let storyWithNoExport = [];
let exportedAndHasStory = [];
let storybookFileExportedFileDifference = 0;
let coveragePercentage = 0;
let coverageStyling = '';
let uncoveredComponents = [];
let uncoveredStories = [];

module.exports = () => {
  exportedModules.forEach(exportedModule => {
    if(allStoryBookFiles.includes(exportedModule)){
      exportedAndHasStory.push(exportedModule);
    } else {
      uncoveredComponents.push(exportedModule);
    }
  });

  allStoryBookFiles.forEach(storyBookFile => {
    if(!exportedModules.includes(storyBookFile)){
      storyWithNoExport.push(storyBookFile);
    }
  });

  storybookFileExportedFileDifference = storyWithNoExport.length
  coveragePercentage = round(exportedAndHasStory.length/exportedModules.length*100, 2);

  coverageStyling = coveragePercentage < 100 ? 'bold.red' : 'bold.green';

  console.log(chalk`
{bold Storybook Coverage Report}
--------------------------------------
Storybook Files: {bold ${allStoryBookFiles.length}}
Exported modules: {bold ${exportedModules.length}}
Exported and has a story: {bold ${exportedAndHasStory.length}}
{${coverageStyling} Storybook Coverage: ${coveragePercentage}}
  `);

  if(uncoveredComponents){
    console.log(chalk`
{bold Modules without stories}
--------------------------------------
${uncoveredComponents.join('\n')}
    `);
  }

  if(storybookFileExportedFileDifference){
    console.warn(chalk`
{yellow.bold You have ${storybookFileExportedFileDifference} Storybook file(s) \nwith no corresponding export!}
--------------------------------------
${storyWithNoExport.join('\n')}
    `);
  }

  if(coveragePercentage < 100){
    console.log(chalk`{white.bold.bgRed  STORYBOOK COVERAGE MUST BE 100% IN ORDER TO MAKE A COMMIT!!! }
Use the flag {bold.magenta  --no-verify } to override the pre-push hook
    `
    );
    process.exit(1);
  } else {
    process.exit(0);
  }
}
