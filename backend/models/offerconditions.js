const mongoose = require('mongoose');

const offerConditionsSchema = mongoose.Schema({
    description: {type: String, required: false},
    imagePath: { type: String, required: false},
})

module.exports = mongoose.model('OfferConditions', offerConditionsSchema)