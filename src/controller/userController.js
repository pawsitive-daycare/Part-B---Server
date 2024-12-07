const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const { userModel } = require("../models/user");


// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json ({message: error.message});
  }
};
// Get a user by ID
const getUser = async (req,res) => {
  try{
    const user = await userModel.findById(req.param.id);
    if(!user) {
      return res.status(400).json({ message: "user not found"});
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create or register new user
const registerUser = async (req, res) => {
  const { email, firstName, lastName, phoneNumber, password } = req.body; 

  try {
    // Checks for existing user
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new userModel({email, firstName, lastName, phoneNumber, password: hashedPassword});
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message:error.message});
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // This checks if the user exists
  const user = await userModel.findOne({ email });
  // if the provided email does not exist in the database
  if (!user) {
    // then return a status of 400 and a message
    return res.status(400).json({ message: "User does not exist" });
  } else {
    // This checks if the password is correct
    if (password === user.password) {
      // return a status of 200 and a message 
      return res.status(200).json({ message: "Login successful" });
    } else {
      // if the provided password is incorrect then
      return res.status(400).json({ message: "Incorrect password" });
    }
  }
};
// Update user

// Delete user
const deleteUser = async (req,res) => {
  try {
    const {id} = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "user not found"});
    }
    res.status(200).json({ message:"User deleted successfully"});
  } catch (error) {
    res.status(500).json({ message: error.message});
  }
};

module.exports = {}



