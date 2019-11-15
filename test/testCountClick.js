const readFileList = require('../getDir/getDir.js');
const fileContentList = readFileList.getDirContent('../puppeteerScripts/');
const countClick = require('../countClick/countClick.js');

const countClickList = countClick.countClick(fileContentList);
console.log(countClickList);