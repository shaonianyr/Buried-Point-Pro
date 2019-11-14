const xlsx = require('node-xlsx');
const fs = require('fs');

function exportResult(data)
{
    var buffer = xlsx.build(data);
    fs.writeFile('./result.xlsx', buffer, function(err) {
        if (err) {
            console.log("写入 excel 错误: " + err);
            return;
        }
        console.log("\n数据已写入 excel 表.");
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