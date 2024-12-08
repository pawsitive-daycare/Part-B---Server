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
    res.status(400).json({ message: error.message});
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
  // This checks if the user exists
  const user = await userModel.findOne({ email });
  // if the provided email does not exist in the database
  if (!user) {
    // then return a status of 400 and a message
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({message: "Invalid credentials"});
  }
  // token
  const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});

  res.status(200).json({ token, userId: user._id });
} catch (error) {
  res.status(500).json({ message: error.message});
  }
};


// Update user
const updateUser = async (req,res) => {
  const {email, firstName, lastName, phoneNumber, password, isAdmin} = req.body;
  
  try { // check if user exists
    const userToUpdate = await userModel.findById(req.params.id);
    if(!userToUpdate) {
      return res.status(404).json({ message: "User not found"});
    }
    // checks for duplicates
    const duplicate = await userModel.findOne({ email }).lean().exec();
      if (duplicate && duplicate._id.toString() !== _id) {
          return res.status(409).json({ message: 'Username already exists in the database' });
      }
    userToUpdate.email = email;
    userToUpdate.firstName = firstName;
    userToUpdate.lastName = lastName;
    userToUpdate.phoneNumber = phoneNumber;
    userToUpdate.isAdmin = isAdmin;
    if (password) {
      userToUpdate.password = await bcrypt.hash(password, 10);
    }
    await userToUpdate.save();
    res.status(200).json({ message: "User updated successfully"});
  } catch (error) {
    res.status(500).json({ message: "Failed to save the data! Please try again later."})
  }
};


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



