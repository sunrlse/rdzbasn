### 山寨缩减版js选择器
```
支持基础选择         -- $(id/class/tag)
复合选择             -- $('#a c .b:contains(xxx)')
父级                 -- $(selector).parent()
相邻                 -- $(selector).siblings(id/class/tag) 
后邻                 -- $(selector).next(id/class/tag)
查找                 -- $(selector).find(selector) 
包含字符              -- $('.a p:contains(xxxx)')
获取html/text         -- $(selector).html()   .text()
html、val赋值         -- $(selector).html(xxx) $(selector).val(xxx)
触发事件              -- $(selector).trigger(buble, event_type)
注：siblings()， next() 内只能一个基础选择器

```

# book-crawler
### 简介
> 这是一个NodeJS爬虫项目， 用于爬取[爱去小说网](http://www.aiquxs.com/)的小说资源

> 用到的模快主要有superagent，cheerio，superagent-charset，mysql，cron，bluebird

> 本项目在Ubuntu环境下开发，未进行Windows测试，NodeJS版本为 v7.1.0

> 感谢开发本项目依赖模快的开源界前辈

### 安装
```
git clone https://github.com/lxzan/book-crawler.git
cd book-crawler
npm install (安装速度较慢，建议使用cnpm)
```

> 创建数据库，文件在crawler.sql

> 配置 src/db.js.template的mysql账户密码并将文件文件改名为db.js


### 启动

```
node --harmony index.js <url>
url表示小说目录页面url， 如 http://www.aiquxs.com/xxx
```
