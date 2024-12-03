const mongoose = require("mongoose");

const petProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    animal: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
});

const PetProfile = mongoose.model('PetProfile', petProfileSchema);

module.exports = {
    PetProfile
}