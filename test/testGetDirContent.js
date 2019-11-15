const readFileList = require('../getDir/getDir.js');
const fileContentList = readFileList.getDirContent('../puppeteerScripts/');

for (var i = 0; i < fileContentList.length; i++) {
    console.log(fileContentList[i]);
}