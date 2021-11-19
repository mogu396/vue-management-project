const mongoose = require('mongoose')

const acountSchema = mongoose.Schema({
    type: {
        type: String,
        require:true
    },
    acountDescrition: {
        type: String,
        required: true
    },
    income: {
        type: String,
        required: true
    },
    expend: {
        type: String,
        required: true
    },
    AcountCash: {
        type: String,
        required: true
    },
    remark: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
})

module.exports = mongoose.model('Acount', acountSchema)