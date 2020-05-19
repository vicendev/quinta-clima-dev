const mongoose = require('mongoose');

const offerSchema = mongoose.Schema({
    title: { type: String, required: true},
    price: {type: String, required: true},
    imagePath: { type: String, required: true},
    documentPath: { type: String, required: false },
    created: {type: String, required: true}
})

module.exports = mongoose.model('Offer', offerSchema)