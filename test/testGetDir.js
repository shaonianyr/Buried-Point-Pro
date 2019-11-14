const readFileList = require('../getDir/getDir.js');

var filesList = [];
readFileList.getDir('../puppeteerScripts',filesList);
// console.log(filesList);
for (var i = 0; i < filesList.length; i++) {
    console.log(filesList[i]);
}