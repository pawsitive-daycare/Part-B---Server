const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    pet: {
        animal: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        breed: {
            type: String
        },
        age: {
            type: Number
        }
    },
    date: {
        type: Date,
        default: Date.now,
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