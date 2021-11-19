const mongoose = require('mongoose')
// 连接数据库
// dbKeys
const db = require('../config/dbKeys').mongodb
module.exports = mongoose.connect(db)
    .then(() => {
        console.log('数据库连接成功');
    })
    .catch(err => console.log(err))

