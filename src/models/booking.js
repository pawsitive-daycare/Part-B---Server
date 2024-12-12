const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    pet: {
        type: mongoose.Schema.Types.ObjectId,
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
        name: { type: String,
            required: true
        },
        price: {type : String,
            required: true
        },
    }
    
});

const bookingModel = mongoose.model('Booking', bookingSchema);

module.exports = {
    bookingModel
}