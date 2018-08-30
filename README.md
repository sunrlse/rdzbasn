### 山寨缩减版js选择器
```
支持基础选择器 -- $(id/class/tag)
复合选择 -- $('#a c .b:contains(xxx)')
父级  -- $(selector).parent()
相邻 -- $(selector).siblings(id/class/tag) 
后邻  -- $(selector).next(id/class/tag)
查找  -- $(selector).find(selector) 
包含字符  -- $('.a p:contains(xxxx)')
获取html/text -- $(selector).html()   .text()
html、val赋值 -- $(selector).html(xxx) $(selector).val(xxx)
触发事件 -- $(selector).trigger(buble, event_type)
# 注：siblings()， next() 内只能一个基础选择器
```
