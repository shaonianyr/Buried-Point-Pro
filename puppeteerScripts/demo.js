const time = require('../timeWait/timeWait.js');

module.exports = async (page) => {

    // 复制录制好的 puppeteer 脚本
    // ..

    // 此次没有复制实际业务作 demo，用 puppeteer 伪装一个事件的上报 
    await page.evaluate(() => console.log('{"properties": { "$url": "www.example.com", "$element_name": "name1", "$element_selector": "#__layout > div", "$title": "page1" }, "event": "$Webclick"}'));

    await time.sleep(1000)
};