# 最新

该项目功能已被集成到 [ShaoNianyr/Scripts_Web_UI_Autotest](https://github.com/ShaoNianyr/Scripts_Web_UI_Autotest)，并进行优化，且集成了 breakpoint & mock 的功能。

Buried-Point-Pro 埋点测试工具的不足:

1. 只是监听了埋点打印在 console 里面的内容，具体有没有真正上报成功不知道。

2. 打印在 console 的是神策埋点的特点，其他的埋点不一定这个方式，拦截埋点上报的链接做测试更精准，更普遍。

3. 没有模拟触发测试异常场景的功能。（如请求失败，请求中断等记录异常错误的埋点）

基于以上的一些优化，也就有了这个新的工具，更多详情见 [ShaoNianyr/Scripts_Web_UI_Autotest](https://github.com/ShaoNianyr/Scripts_Web_UI_Autotest) 。




--------------------------- 以下为原文 -------------------------------

# 埋点自动化测试 Pro

Buried-Point-Pro 项目的前身：[maidianDemoTest](https://github.com/ShaoNianyr/maidianDemoTest)

Buried-Point-Pro，基于 nodejs 和 puppeteer 开发的埋点自动化测试框架，对外暴露 puppeteerScripts 的脚本文件夹，可以放置所有写好或录制好的 puppeteer 的业务流程脚本，并自动遍历执行所有脚本，监听并记录所有脚本流程的埋点信息。

框架仅输出每个流程的所有埋点信息的 excel 表，每个脚本分不同的 sheet 记录，以及根据点击元素的 name 属性和该元素上报的事件名字进行对比校验。对埋点的校验方式支持二次扩展开发。

更多详情见下方项目原理图。

## 项目原理（我觉得还是看图吧！）

[项目原理图高清链接](https://www.processon.com/view/link/5dd38659e4b01da3459348c7)

<img src="https://github.com/ShaoNianyr/Buried-Point-Pro/blob/master/picture/BuriedPointPro.png">


## 快速体验

```
    // 首先要准备好 nodejs && npm 环境
    git clone https://github.com/ShaoNianyr/Buried-Point-Pro.git
    cd Buried-Point-Pro
    npm install // 最好用 cnpm 
    node test.js 
```

## 实际使用

-   通过第三方工具 [puppeteer-recorder](https://github.com/checkly/puppeteer-recorder) 一键录制复杂的脚本 / 手写 puppeteer 脚本 放到 puppeteerScripts 文件夹下

-   注释掉 test.js 中的 " // demo 演示代码... "下的代码，启用 " // 实际业务代码... "下的代码

-   node test.js

## 为什么要做埋点 Pro

maidianDemoTest 在投入使用的过程中发现，只能对静态页面的埋点进行检测，动态页面需要根据业务逻辑手动去写代码并提 excel 来设计，非常的麻烦，尤其是当业务流程很复杂又很多的时候，一样显得非常麻烦。在这样的一种前提下，重写了整个项目，由此而来的就是 Buried-Point-Pro. 

Buried-Point-Pro 换了另外一种方式来执行埋点的脚本，可以通过第三方工具 [puppeteer-recorder](https://github.com/checkly/puppeteer-recorder) 一键录制复杂的脚本，无需手动 copy selector 定位和写大量重复的 click 语句，脚本运行的时候，会遍历 puppeteerScripts 文件夹下所有的执行脚本，并记录过程中的上报埋点，并将这一系列的流程保存到单独的 sheet 里面，方便定位到具体某个业务流程的埋点。这样无惧复杂的业务流程，且但项目迭代时，你只需要重新录制一遍相关改动的业务流程即可，其他的脚本就可以作为埋点的回归测试。
