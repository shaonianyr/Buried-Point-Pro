const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const resultExcels = require('./resultExcels/exportResult.js');
const readFileList = require('./getDir/getDir.js');
const log4js = require('./logs/logUtils.js'); 
const loggerSuc = log4js.getLogger('datelogSuc'); 
const loggerFail = log4js.getLogger('datelogFail'); 
const countClick = require('./countClick/countClick.js');
const scriptPath = './puppeteerScripts/';
const resultPath = './result.xlsx';


(async () => {
    // debug 使用
    // const browser = await puppeteer.launch({ headless: false});

    // 实际业务使用
    const browser = await puppeteer.launch();

    var arr = [];

    var key;
    var sheetName;
    var sheetNum = 0;
    var filesList = [];
    readFileList.getDir(scriptPath, filesList);

    for (var i = 0; i < filesList.length; i++) {

        // 开启移动端模拟
        const page = await browser.newPage();
        await page.emulate(devices['iPhone X']);

        page.on('console', msg => {
            if (typeof msg === 'object') {

                // debug 使用
                // console.log(msg);

                try {
                    var obj = JSON.parse(msg._text);

                    if (obj.properties.$element_name !== undefined) {
                        // debug 使用
                        loggerSuc.info('\n上报事件：\n', obj);

                        // Excel记录逻辑
                        (async () => {
                            // 实际业务代码获取定位元素的 name 属性
                            // const name = await page.$eval(obj.properties.$element_selector, el => el.getAttribute('name'));
                            
                            // demo 演示代码直接自定义 name 属性
                            const name = 'name1';
                            
                            loggerSuc.info('\n埋点事件信息记录：\n', obj.event, obj.properties.$url, '\n预期上报名字：', name, '\n实际上报名字：', obj.properties.$element_name);
                            var list = [];
                            list.push(key.toString(), obj.properties.$url, obj.event, name, obj.properties.$element_name, '/', '1');
                            arr[sheetNum].data.push(list);
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
        if (filesList[i].base === 'demo.js') {
            var customPathFunction = require(scriptPath + filesList[i].base);
            sheetName = filesList[i].name;
            key = 1;
            var keyName = {
                name: sheetName,
                data: [['key', 'url', 'event', 'expectName', 'actualName', 'loginPosition', 'report'],]
            }
            arr.push(keyName);
            await customPathFunction(page);
            sheetNum++;
        }

        // 实际业务代码
        // if (filesList[i].base != 'demo.js') {
        //     var customPathFunction = require(scriptPath + filesList[i].base);
        //     sheetName = filesList[i].name;
        //     key = 1;
        //     var keyName = {
        //         name: sheetName,
        //         data: [['key', 'url', 'event', 'expectName', 'actualName', 'loginPosition', 'report'],]
        //     }
        //     arr.push(keyName);
        //     await customPathFunction(page);
        //     sheetNum++;
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

    await browser.close();
})()
