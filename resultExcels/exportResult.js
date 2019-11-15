const xlsx = require('node-xlsx');
const fs = require('fs');
const log4js = require('../logs/logUtils.js'); 
const loggerSuc = log4js.getLogger('datelogSuc'); 
const loggerFail = log4js.getLogger('datelogFail'); 

function exportResult(data)
{
    var buffer = xlsx.build(data);
    fs.writeFile('./result.xlsx', buffer, function(err) {
        if (err) {
            loggerFail.error("\n写入 excel 错误: " + err);
            return;
        }
        loggerSuc.info("\n数据已写入 excel 表.");
    })
}

function getExcel(path)
{
    var sheets = xlsx.parse(path);
    var arrTotal = [];
    sheets.forEach(function(sheet) {
        var arr = [];
        for(var i = 1; i < sheet["data"].length; i++) {
            var row = sheet['data'][i];
            if(row && row.length > 0){
                arr.push({
                    script: sheet['name'],
                    key: row[0],
                    url: row[1],
                    event: row[2],
                    expectName: row[3],
                    actualName: row[4],
                    loginPositin: row[5],
                    report: row[6],
                });
            }
        }
        arrTotal.push(arr);
    });
    return arrTotal;
}

module.exports = {
    exportResult,
    getExcel
}