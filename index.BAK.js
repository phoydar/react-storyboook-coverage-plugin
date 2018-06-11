/* eslint-disable */
const fs = require('fs');
const walkSync = require('walk-sync');

const config = require('./config.json');

const dir = config.testDirectory;
const ignoredFiles = config.ignoredFiles;
const ignoredDirectories = config.ignoredDirectories;

let dirs = [];
let filteredFileList = [];
let filteredFileNames = [];

var walkSync = function(dir, filelist) {

  if( dir[dir.length-1] != '/') {
    dir = dir.concat('/');
  }

  var fs = fs || require('fs'),
      files = fs.readdirSync(dir);

  filelist = filelist || [];

  files.forEach(function(file) {
    if (fs.statSync(dir + file).isDirectory()) {
      filelist = walkSync(dir + file + '/', filelist);
    }
    else {
      if(ignoredFiles.indexOf(file.replace('.js', '')) === -1){
        // console.log(file);
        filelist.push(dir+file);
      }
    }
  });

  return filelist;
};

const list = walkSync(dir);
const filteredDirs = list.filter(file => !file.match(/.*\_\_(data|snapshots)\_\_.*/ig));
const indexFiles = filteredDirs.filter(file => file.match(/(.)*.index.js/ig));

let indexFileLines = [];

indexFiles.forEach((indexFile) => {
  var array = fs.readFileSync(indexFile).toString().split("\n");

  array = array.filter(line => line.match(/.*export.*/ig));

  for(i in array) {
    indexFileLines.push(array[i]);
  }
});

console.log(indexFileLines);

const exportedItems = indexFileLines.length;
const storybookFiles = list.filter(file => file.match(/(.)*.stories.js/ig));
const numStoryBookFiles = storybookFiles.length;

let storyFileNames = [];

// console.log(storybookFiles);

storybookFiles.forEach((file) => {
  var fileName = file.replace(/^\/.*\//ig, "");
  fileName = fileName.replace('.stories.js', "");

  storyFileNames.push(fileName);
});

// var myString = "export { someExportHere }";
// var myRegexp = /export { (.*) }.*/gmi;
// var match = myRegexp.exec(myString);
// console.log(match[1]); // abc

let indexFileNames = [];
indexFileLines.forEach((file) => {
  var myString = file;
  var myRegexp = /export { (.*) }.*/gmi;
  var match = myRegexp.exec(myString);
  var moduleName = match[1];

  if(ignoredFiles.indexOf(moduleName) === -1){
    indexFileNames.push(moduleName);
  }
});

var exportedAndHasStory = [];
indexFileNames.forEach((fileName) => {
  if(storyFileNames.includes(fileName)){
    exportedAndHasStory.push(fileName);
  }
});

// console.log(indexFileNames);
console.log(indexFileNames);
console.log((exportedAndHasStory.length/indexFileNames.length*100).toFixed(2));

// console.log(indexFileLines);
// console.log((numStoryBookFiles/exportedItems*100).toFixed(2));
// console.log(storybookFiles.length/filteredFileNames.length*100);
