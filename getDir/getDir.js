var fs = require('fs');
var path = require('path');

function getDir(dir, filesList = []) {
    var dir = path.resolve(dir);
    const files = fs.readdirSync(dir);
    files.forEach((item, index) => {
        var fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {   
            readFileList(path.join(dir, item), filesList); //递归读取文件
        } else {        
            filesList.push(fullPath);           
        }    
    });
    return filesList;
}

module.exports = {
    getDir
}