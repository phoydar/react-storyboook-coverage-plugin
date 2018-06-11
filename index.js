#!/usr/bin/env node

/* eslint-disable */
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

module.exports = storybookCoverage;
function storybookCoverage() {
  exportedModules.forEach(exportedModule => {
    if(allStoryBookFiles.includes(exportedModule)){
      exportedAndHasStory.push(exportedModule);
    };
  });

  allStoryBookFiles.forEach(storyBookFile => {
    if(!exportedModules.includes(storyBookFile)){
      storyWithNoExport.push(storyBookFile);
    }
  });

  storybookFileExportedFileDifference = allStoryBookFiles.length - exportedAndHasStory.length
  coveragePercentage = round(exportedAndHasStory.length/exportedModules.length*100, 2);

  coverageStyling = coveragePercentage < 100 ? 'bold.red' : 'bold.green';

  console.log(chalk`
  Storybook Files: {bold ${allStoryBookFiles.length}}
  Exported modules: {bold ${exportedModules.length}}
  Exported and has a story: {bold ${exportedAndHasStory.length}}
  -------------------------
  {${coverageStyling} Storybook Coverage: ${coveragePercentage}}
  `);

  if(storybookFileExportedFileDifference){
    console.warn(chalk
      `{yellow You have ${storybookFileExportedFileDifference} Storybook files with no corresponding export!}`);
  }

  if(coveragePercentage < 100){
    console.log(chalk
      `
      {red STORYBOOK COVERAGE MUST BE 100% IN ORDER TO MAKE A COMMIT!!!}
      `
    );
    process.exit(1);
  } else {
    process.exit(0);
  }
}
