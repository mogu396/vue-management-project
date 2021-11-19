const express = require('express')
const Acount = require('../../modules/Acount')
const router = express.Router()
const jwt = require('jsonwebtoken')
// const {secretKey} =require('../../config/dbKeys')
const { jwtDetect } = require('../../middleWare/jwt')


// 信息添加
router.post('/add', jwtDetect, (req, res) => {
    const acount = new Acount()
    acount.userId = req.tokenData.id
    if (req.body.type !== null) {
        acount.type = req.body.type
    }
    if (req.body.acountDescrition !== null) {
        acount.acountDescrition = req.body.acountDescrition
    }
    if (req.body.income !== null) {
        acount.income = req.body.income
    }
    if (req.body.expend !== null) {
        acount.expend = req.body.expend
    }
    if (req.body.AcountCash !== null) {
        acount.AcountCash = req.body.AcountCash
    }
    if (req.body.remark !== null) {
        acount.remark = req.body.remark
    }

    acount.save().then((acount) => {
        res.json(acount)
    })
})

// 获取当前用户的所有账户信息
router.get('/', jwtDetect, (req, res) => {
    Acount.find().then(data => {
        if (!data.length) {
            res.status(404).json({ "msg": "not found anythings" })
        } else {
            res.json(data)
        }


    }).catch(err => {
        res.status(404).json(err)
    })
})

// 查询当前用户的某条信息
router.get('/:id', jwtDetect, (req, res) => {
    Acount.findOne({ _id: req.params.id }).then(data => {
        if (!data) {
            res.status(404).json({ "msg": "not found anythings" })
        }
        res.json(data)

    }).catch(err => {
        res.status(404).json(err)
    })
})


// 编辑
router.put('/edit/:id', jwtDetect, (req, res) => {
    // { type, acountDescrition, income, expend, AcountCash, remark }=acount
    Acount.findByIdAndUpdate(req.params.id, req.body).then(data => {
        res.status(201).json(data)
    }).catch(err => {
        res.status(404).json(err)
        console.log(err)
    })
})

// 删除
router.delete('/delete/:id', jwtDetect, (req, res) => {
    Acount.findByIdAndDelete(req.params.id).then(data => {
        res.status(201).json(data)
    }).catch(err => {
        res.status(404).json(err)
        console.log(err)
    })
})
module.exports = router