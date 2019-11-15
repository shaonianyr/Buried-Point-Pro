var fs = require('fs');
var path = require('path');

function getDir(dir, filesList = []) {
    var dir = path.resolve(dir);
    const files = fs.readdirSync(dir);
    files.forEach((item, index) => {
        var fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            getDir(path.join(dir, item), filesList); //递归读取文件
        } else {        
            filesList.push(path.parse(fullPath));
        }
    });
    return filesList;
}

function getDirContent(dir) {
    var dir = path.resolve(dir);
    const files = fs.readdirSync(dir);
    var contentList = [];
    files.forEach((item, index) => {
        var fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            getDir(path.join(dir, item)); //递归读取文件
        } else {
            var content = fs.readFileSync(fullPath, 'utf-8');
            contentList.push({
                file: path.parse(fullPath).name,
                content: content,
            });
        }
    });
    return contentList;
}

module.exports = {
    getDir,
    getDirContent
}