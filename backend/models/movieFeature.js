const mongoose = require('mongoose');

const movieFeatureSchema = new mongoose.Schema({

    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true,
        unique: true
    },

    features: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    }

});

module.exports = mongoose.model('MovieFeatureModel', movieFeatureSchema);