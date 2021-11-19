const express=require('express')
const app = express()
const users=require('./routers/api/users')
const acounts=require('./routers/api/acount')
// 设置变量环境
const port = process.env.PORT || 8090

require('./db/db')


// 使用中间件
// 解析json
app.use(express.json())
// Express4.16+已经加入了bodyParser
/**
 * 当action为get时候，
 * 浏览器用x-www-form-urlencoded的编码方式把form数据转换成一个字串（name1=value1&name2=value2…），
 * 然后把这个字串append到url后面，用?分割，加载这个新的url。
 */
app.use(express.urlencoded({extended:false}))






// 应用路由
app.use('/api/users', users)
app.use('/api/acounts',acounts)

app.listen(port, () => {
    console.log(`server is listening at http://localhost:${port}`);
})