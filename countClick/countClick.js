const readFileList = require('../getDir/getDir.js');

function countClick(list) {
    var countClickList = [];
    var clickList = [];
    for (var i = 0; i < list.length; i++) {
        clickList = list[i].content.match(/click/g);
        countClickList.push({
            script: list[i].file,
            count: clickList.length,
        })
    }
    return countClickList;
}

module.exports = {
    countClick
}