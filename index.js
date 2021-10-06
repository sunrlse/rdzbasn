(async function() {
    var arguments = process.argv.splice(2);
    const crawler = require('./src/crawler');
    console.log('开始下载');
    await crawler.loader(arguments[0]);
    await crawler.run();
    var cronJob = require("cron").CronJob;
    new cronJob('*/20 * * * * *', async function() {
        await crawler.run();
    }, null, true, 'Asia/Shanghai');
})();
