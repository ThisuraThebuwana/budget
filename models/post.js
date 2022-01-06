const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        required: false,
        default: 0
    },
    dislikes: {
        type: Number,
        required: false,
        default: 0
    },
    filename: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Post', postSchema)