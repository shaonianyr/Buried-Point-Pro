const log4js = require('log4js');

log4js.configure(
{
  appenders:
  {
    console:
    {
        type: 'console',
    },
    datelogSuc:
    {
        type: 'dateFile',
        filename: './logs/logs/infolog',
        pattern: ".yyyy-MM-dd.txt",
        // alwaysIncludePattern: true,
        // maxLogSize: 10, // 无效
        // backups: 5, // 无效
        compress: true,
        daysToKeep: 2,
    },
    datelogFail:
    {
        type: 'dateFile',
        filename: './logs/logs/debuglog',
        pattern: ".yyyy-MM-dd.txt",
        compress: true,
        daysToKeep: 2,
    },
    // more...
  },
  categories:
  {
      default:
      {
          appenders: ['console'],
          level: 'debug',
      },
      datelogSuc:
      {
          // 指定为上面定义的appender，如果不指定，无法写入
          appenders: ['console', 'datelogSuc'],
          level: 'debug', // 指定等级
      },
      datelogFail:
      {
          appenders: ['console', 'datelogFail'],
          level: 'debug',
      },
      // more...
  },
  
  // for pm2...
  pm2: true,
  disableClustering: true, // not sure...
}
);


function getLogger(type)
{
    return log4js.getLogger(type);
}

module.exports = {
    getLogger,
}