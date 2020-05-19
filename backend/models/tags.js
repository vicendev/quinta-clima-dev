const mongoose = require('mongoose');

const tagSchema = mongoose.Schema({
    content: { type: String, required: true},
    date: {type: String, required: true}
})

module.exports = mongoose.model('Tag', tagSchema)