
const mongoose = require("mongoose");

// Create a Mongoose schema to define the structure of a model

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },   
    firstName: {
        type: String,
        required: true,
        unique: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
     
});

// Create a Mongoose model based on the userSchema
const userModel = mongoose.model("User", userSchema);

module.exports = {
    userModel
}