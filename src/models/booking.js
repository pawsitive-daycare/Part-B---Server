const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    service: {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    },
    date: {
        type: Date,
        required: true
    },
    // {
    //     year: {
    //         type: Number,
    //         required: true
    //     },
    //     month: {
    //         type: Number,
    //         required: true
    //     },
    //     day: {
    //         type: Number,
    //         required: true
    //     },
    //     time: {
    //         type: String,
    //         required: true
    //     }
    
    pet: {
        animal: {
            type: String,
            required: true
        },
        name: {
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
        }
    }
});

const bookingModel = mongoose.model('Booking', bookingSchema);

module.exports = {
    bookingModel
}