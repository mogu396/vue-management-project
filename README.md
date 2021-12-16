# 后台管理系统

> 一个基于node.js与vue的后台管理系统，实现基本的CRUD以及jwt鉴权。



> 关于面试官今天问的，具体是怎么处理权限问题，我没答好，如果面试官看到我的github可以看看我下面的更新。



> 由于我是练习所以我尽可能多尝试不同的解决方案，所以后端代码中的user.js和acount.js中间件处理不同，看起来有些乱。下面是权限处理的逻辑。



> 后端的jwt中间件对请求使用verify方法进行鉴权，如果error，返回401状态码，前端响应拦截器如果接到401状态码，提示用户并清空本地token。
>
> ![jwt](https://github.com/mogu396/myImgStorage/blob/main/jwt%E4%B8%AD%E9%97%B4%E4%BB%B6.png?raw=true)
>
> ![响应拦截器](https://github.com/mogu396/myImgStorage/blob/main/%E5%93%8D%E5%BA%94%E6%8B%A6%E6%88%AA%E5%99%A8.png?raw=true)

## 项目截图

- 主页

![主页](https://github.com/mogu396/myImgStorage/blob/main/vue-management-project.png?raw=true)


## 用到的框架以及插件
#### 前端
- vue
- vue Router
- vuex
- Axios
- ElementUI
  
#### 后端
- express(4.x)
- mongodb(mongoose)
- jsonwebtoken


## 项目运行设置

- 克隆到本地

```
git clone https://github.com/mogu396/vue-management-project
```

- 分别进入前后端项目
  
```
yarn
```

- 启动项目

```
yarn serve
```
