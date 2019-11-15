const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const resultExcels = require('./resultExcels/exportResult.js');
const readFileList = require('./getDir/getDir.js');
const log4js = require('./logs/logUtils.js'); 
const loggerSuc = log4js.getLogger('datelogSuc'); 
const loggerFail = log4js.getLogger('datelogFail'); 
const scriptPath = './puppeteerScripts';
const resultPath = './result.xlsx';

(async () => {
    // debug 使用
    // const browser = await puppeteer.launch({ headless: false});

    // 实际业务使用
    const browser = await puppeteer.launch();

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

    var key = 1;
    var filesList = [];
    readFileList.getDir(scriptPath,filesList);

    for (var i = 0; i < filesList.length; i++) {

        // 开启移动端模拟
        const page = await browser.newPage();
        await page.emulate(devices['iPhone X']);

        // var hadSent = 0;
        // var perElementName = '';

        page.on('console', msg => {
            if (typeof msg === 'object') {

                // debug 使用
                // console.log(msg);

                try {
                    var obj = JSON.parse(msg._text);

                    // debug 使用
                    loggerSuc.info('\n上报事件：\n', obj);

                    if (obj.properties.$element_name !== undefined) {
                        // 日志记录逻辑 待做
                        // hadSent = 1;
                        // if (sheet[i][j].element_name === obj.properties.$element_name) {
                        //     if (perElementName === '') {
                        //         perElementName = obj.properties.$element_name;
                        //         elementPage = obj.properties.$title;
                        //     } else {
                        //         nonRepeatReport = 0;
                        //     }
                        // } else {
                        //     if (!hadNameTrue) {
                        //         nonRepeatReport = 0;
                        //     }
                        //     hadNameTrue = 0;
                        //     wrongElementName = obj.properties.$element_name;
                        // }

                        // Excel记录逻辑
                        (async () => {
                            // 实际业务代码获取定位元素的 name 属性
                            // const name = await page.$eval(obj.properties.$element_selector, el => el.getAttribute('name'));
                            
                            // demo 演示代码直接自定义 name 属性
                            const name = 'name1';
                            
                            loggerSuc.info('\n埋点事件信息记录：\n', obj.event, obj.properties.$url, '\n预期上报名字：', name, '\n实际上报名字：', obj.properties.$element_name);
                            var list = [];
                            list.push(key.toString(), obj.properties.$url, obj.event, name, obj.properties.$element_name, '/', '1');
                            arr[0].data.push(list);
                            key++;
                        })();
                    }

                    // 自定义事件，待做
                    // if (obj.properties.login_position !== undefined) {
                    //     console.log('$loginPositon', obj.properties.login_position);
                    // }
                  } catch (error) {
                    var obj = {};
                  }
            }
        });

        // demo 演示代码，指定运行脚本目录下的 demo.js 脚本
        if (filesList[i] === '/home/shaonian/maidian/puppeteerScripts/demo.js') {
            var customPathFunction = require(filesList[i]);
            await customPathFunction(page);
        }

        // 实际业务代码
        // if (filesList[i] !== '/home/shaonian/maidian/puppeteerScripts/demo.js') {
        //     var customPathFunction = require(filesList[i]);
        //     await customPathFunction(page);
        // }
    }

    resultExcels.exportResult(arr);

    var promise = new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(resultExcels.getExcel(resultPath));
        }, 2000);
    });

    promise.then(function(value) {
        // 打印写好的 excel 表的内容
        loggerSuc.info('\nexcel 表中记录的埋点数据:\n', value);
    });

    await browser.close()

})()
