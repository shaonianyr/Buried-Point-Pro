const resultExcels = require('../resultExcels/exportResult.js');
const path = './result.xlsx';

var arr = [{  name: 'sheet1', 
              data: [
                        [
                            'key',
                            'url',
                            'event',
                            'expectName',
                            'actualName',
                            'loginPosition',
                            'report'
                        ],
                    ]
            }];

var list1 = ['1', 'http://www.baidu.com', '$webclick', 'name1', 'name2', '/', '0'];
var list2 = ['2', 'http://www.baidu.com', '$webclick', 'name1', 'name2', '/', '1'];
var list3 = ['3', 'http://www.baidu.com', '$loginPosition', '/', '/', 'location1', '1'];

arr[0].data.push(list1);

resultExcels.exportResult(arr);

var promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
        resolve(resultExcels.getExcel(path));
    }, 1000);
});

promise.then(function(value) {
    console.log('Writing data:');
    console.log(value);
});