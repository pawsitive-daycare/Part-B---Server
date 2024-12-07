const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.ObjectId,
        ref: 'User'
    },
    pet: {
        type: mongoose.ObjectId,
        ref:'PetProfile'
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: true
    }
    
});

const bookingModel = mongoose.model('Booking', bookingSchema);

module.exports = {
    bookingModel
}