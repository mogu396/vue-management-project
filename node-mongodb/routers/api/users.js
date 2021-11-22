// 登陆与注册
const express = require('express')
const User = require('../../modules/User')
const router = express.Router()
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { secretKey } = require('../../config/dbKeys')

router.get('/', (req, res) => {
    res.json({
        msg: 'login works'
    })
})

// 注册账号
router.post('/register', (req, res) => {
    console.log(req.body)
    // console.log(JSON.stringify(req.body));
    // res.send(req.body)
    // 查询数据库中是否已经有该邮箱
    User.findOne({
        userEmail: req.body.useruserEmail
    }).then((user) => {
        if (user) {
            // 如果邮箱存在，即用户存在，返回400
            return res.status(400).json({
                message: '邮箱已存在'
            })
        } else {
            // return res.status(200).json({
            //     message:'邮箱未使用，您可以选择注册该邮箱'
            // })
            const newUser = new User({
                userName: req.body.userName,
                userEmail: req.body.userEmail,
                userPassword: req.body.userPassword,
                // 权限
                identity: req.body.identity

            })
            // bcrypt加密
            console.log(newUser)
            bcryptjs.genSalt(10, function (err, salt) {
                bcryptjs.hash(newUser.userPassword, salt, function (err, hash) {
                    if (err) {
                        throw err
                    }
                    newUser.userPassword = hash
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err))
                });

            });


        }
    })
})


// 登陆接口，返回jwk
router.post('/login', (req, res) => {
    const userEmail = req.body.userEmail
    const userPassword = req.body.userPassword

    User.findOne({ userEmail }).then((user) => {
        if (!user) {
            res.status(404).json({ msg: "用户未注册" })
        }
        // 解密密码
        // 参数一，前端获取的密码
        // 参数二，数据库存储的密码
        bcryptjs.compare(userPassword, user.userPassword).then(isMatch => {
            if (isMatch) {
                // 规则，名字，过期时间(对象),回调函数
                const rule = {
                    id: user.id,
                    userName: user.userName,
                    userEmail:user.userEmail,
                    identity: user.identity,
                }
                jwt.sign(rule, secretKey, { expiresIn: "1 days" }, (err, token) => {
                    if (err) {
                        res.status(400).json({ msg: 'token error' })
                    }
                    res.json({
                        success: true,
                        token: "Bearer " + token,
                        id: user.id,
                        userName: user.userName,
                        userEmail: user.userEmail,
                        identity: user.identity
                    })
                })
            } else {
                res.status(400).json({ msg: "userPassword error" })
            }
        })
    })
})


router.use('/profile', (req, res, next) => {
    const raw = String(req.headers.authorization).split(' ')[1]
    jwt.verify(raw, secretKey, (err, data) => {
        if (err) {
            res.status(400).json({ msg: 'token error' })
            throw err
        } else {
            req.tokenData = data
            console.log('-----------');
            console.log(data);
        }

    })
    next()
})

// GET请求用户信息,验证jwk
router.get("/profile", (req, res) => {
    let userProfile
    // const raw = String(req.headers.authorization).split(' ')[1]
    // let tokenData

    // jwt.verify(raw, secretKey, (err, data) => {
    //     if (err) {
    //         res.status(400).json({ msg: 'token error' })
    //     } else {
    //         tokenData = data
    //     }

    // })

    // const id = tokenData.id
    // User.findById(id).then(data => {
    //     userProfile = data
    //     console.log(userProfile)
    //     res.send({
    //         success: true,
    //         id: userProfile.id,
    //         userName: userProfile.userName,
    //         userEmail: userProfile.userEmail,
    //         identity: userProfile.identity
    //     })
    // }).catch(err => {
    //     throw err
    // })
    const id = req.tokenData.id
    User.findById(id).then(data => {
        userProfile = data
        console.log(userProfile)
        res.send({
            success: true,
            iat: req.tokenData.iat,
            exp: req.tokenData.exp,
            id: userProfile.id,
            userName: userProfile.userName,
            userEmail: userProfile.userEmail,
            identity: userProfile.identity
        })
    }).catch(err => {
        throw err
    })
})
module.exports = router