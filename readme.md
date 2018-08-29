# 项目说明

## 运行项目

1. `git clone https://github.com/xubaoshi/eyes.git`  
2. 切换项目至根目录 执行 `yarn intsall` 或 `npm install` 推荐 yarn ， [安装地址](https://yarnpkg.com/zh-Hans/)  
3. `yarn global add wepy-cli` 或 `npm install -g wepy-cli`  
4. 开发模式 `yarn run dev` 或 `npm run dev`  
5. 发布 `yarn run build` 或 `npm run build`  

## 编辑器

### vscode

#### 1. wpy 代码格式化

wpy-beautify（插件）

#### 2. wpy 代码高亮

Vetur（插件）

setting.json 配置

``` json
"files.associations": {
    "*.vue": "vue",
    "*.wpy": "vue",
    "*.wxml": "html",
    "*.wxss": "css"
},
"emmet.syntaxProfiles": {
    "vue-html": "html",
    "vue": "html"
}
```

#### 3.vetur 会对 .user 的修饰符标注红色波浪线提示错误

setting.json 配置

``` json
"vetur.validation.template": false,
```

#### 4. js 格式化

prettier（插件）  

.prettierrc 配置 可以使用右键格式化代码

``` javascript
{
  "singleQuote": true,
  "semi": false
}
```

#### 5. 代码检查工具

eslint（插件）  

## 小程序框架及 UI 库

### 框架

[wepy](https://tencent.github.io/wepy/document.html#/?id=%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8%E6%8C%87%E5%8D%97)

### UI 库

- [zanui](https://youzan.github.io/vant-weapp)
- [zanui(wepy 版本 )](https://github.com/brucx/wepy-zanui-demo)
- [weui(wepy 版本)](https://github.com/wepyjs/wepy-weui-demo)
- [wux](https://github.com/wux-weapp/wux-weapp)

## 页面配置

`src/app.wpy` pages 配置小程序中涉及的页面，其中**数组的第一项代表小程序的初始页面首页**

``` javascript
    config = {
      pages: [
        'pages/patient/index',
        'pages/index',
        'pages/doctor/index',
        'pages/seller/index'
      ],
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'xxx',
        navigationBarTextStyle: 'black'
      }
    }
```

## 页面说明

```
  // 业务组件
  --components
    --business
        --consult
          --index.wpy  //咨询标签页首页
          --radio.wpy  //选择咨询人组件
        --home
          --index.wpy  //爱眼康标签页首页
        --user
          --index.wpy  //个人中心标签页首页
  // 业务页面
  --pages
    --patient
        --consult
            --add.wpy      //快速咨询第一步
            --pay.wpy      //支付页
            --history.wpy  //历史记录
            --evaluate.wpy //评价
            --detail.wpy   //详情
            --reply.wpy    //快速回复
            --consulter
              --add.wpy    //添加咨询人
              --list.wpy   //选择咨询人
        --doctor
            --index.wpy    //找医生
            --detail.wpy   //医生详情
            --evalateList.wpy //医生评价列表
        --user
            --info.wpy     //个人信息
            --name.wpy     //修改昵称
            --income.wpy   //收入明细
          --share
              --index.wpy  //推荐给朋友
              --myUser.wpy //我发展的用户
              --preview.wpy//我的推荐图片
          --cash
              --index.wpy   //提现页面
              --bankAdd.wpy //银行添加
              --history.wpy //提现历史
      --index.wpy           //首页
```

## Mock 数据

该项目使用 [easy-mock](https://www.easy-mock.com/project/5b719f05ebd4a208cce29bb8) 进行数据的模拟

## 小程序调试

下载 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)  
clone 代码后 进入到项目执行命令 `yarn run dev` 或 `npm run dev` ，打开微信开发者工具，选择小程序，将路径指定到项目代码即可

## Q&A

### 1.微信小程序在手机上只有打开调试模式的时候才显示界面

服务器的域名没有设置   [参考链接](https://blog.csdn.net/wzlhlhhh/article/details/80512100)

### 2.获取 openId ，sessionKey ， unionId

调用 `wepy.login()` 获取 code ， 调用后端借口传递 code 获取

### 3.小程序中的图片要用绝对路径否则无法显示

### 4.微信开发者工具中缓存无法清除

使用 `yarn run clean` 或 `npm run clean`， windows 系统下在 cmd 中命令是失效的，请打开 git bash 执行该命令

### 5. `src/config.js` 

该文件中 `baseUrl` 配置当前应用请求的 url 前缀，生产环境尚未配置，开发环境默认指向 [mock地址](https://www.easy-mock.com/mock/5b719f05ebd4a208cce29bb8)

### 6. 后端请求格式

``` javascript

  // 1.普通 get 请求
  {
    //返回码 成功0
    "code": 0,
    //如果code不为0，提示信息
    "errMsg": "mock",
    "data": {
      "phone": "13212341234"
    }
  }

  // 2.带翻页 get 请求， 页面懒加载使用
  {
    //返回码 成功0
    "code": 0,
    //如果code不为0，提示信息
    "errMsg": "mock",
    "data": {
      //翻页数据
      "data": [{
        "doctorId": "1",
        "name": "王大陆1",
      }],
      //第几页
      "pageNo": "1",
      //每页数量
      "pageSize": "10",
      //总数
      "records": "12",
      //总页数
      "pages": "2"
    }
  }

  // 3.其他请求(post等)
  {
    //返回码 成功0
    "code": 0,
    //如果code不为0，提示信息
    "errMsg": "mock",
    "data": {
    }
  }

```