const readFileList = require('../getDir/getDir.js');
const path = require('path');
var filesList = [];
readFileList.getDir('../puppeteerScripts/',filesList);

for (var i = 0; i < filesList.length; i++) {
    // console.log(filesList[i]);
    console.log('./puppeteerScripts/' + filesList[i].base);
}