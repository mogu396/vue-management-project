const jwt=require('jsonwebtoken')
const {secretKey}=require('../config/dbKeys')
const jwtDetect = (req, res, next) => {
    const raw = String(req.headers.authorization).split(' ')[1]
    jwt.verify(raw, secretKey, (err, data) => {
        if (err) {
            res.status(401).json({ msg: 'token error' })
            throw err
        } else {
            req.tokenData = data
        }

    })
    next()
}

module.exports = {
    jwtDetect
}