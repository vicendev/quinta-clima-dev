const mongoose = require('mongoose');

const workDoneSchema = mongoose.Schema({
    servId: { type: String, required: true},
    tagId: { type: String, required: true},
    tagDesc: {type: String, required: true},
    description: {type: String, required: true},
    imagePath: { type: String, required: true},
    created: { type: String, required: true},
})

module.exports = mongoose.model('WorksDone', workDoneSchema)