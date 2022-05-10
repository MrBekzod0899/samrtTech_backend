const { Schema, model } = require('mongoose')

const product = new Schema({
    title: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    price: Number,
    sale: Number,
    text: String,
    view: Number,
    news: {
        type: Number,
        default: 0
    },
    top: {
        type: Number,
        default: 0
    },
    order: {
        type: Number,
        default: 0
    },
    status: {
        type: Number,
        default: 0
    },
    review: [{
        name: String,
        cretedAt: {
            type: Date,
            default: Date.now()
        },
        mark: {
            type: Number,
            default: 0
        },
        title: String,
        text: String
    }],
    photos: [String],
    attributes: [{
        attribut: {
            type: Schema.Types.ObjectId,
            ref: 'Attribute'
        },
        value: String
    }]
})

module.exports = model('Product', product)