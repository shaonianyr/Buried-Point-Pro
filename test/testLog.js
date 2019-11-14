const log4js = require('../logs/logUtils.js'); // 引入库
const loggerSuc = log4js.getLogger('datelogSuc'); // 获取指定的输出源
const loggerFail = log4js.getLogger('datelogFail'); // 获取指定的输出源
loggerSuc.info('info'); // 打印
loggerFail.warn('warn'); // 打印
loggerFail.debug('debug'); // 打印
loggerFail.error('error'); // 打印