const { userModel } = require("../models/user");


// Get all users

// Get a user by ID
const getUser = async (req,res) => {
  try{
    const user = await userModel.findById(req.param.id);
    if(!user) {
      return res.status(400).json({ message: "user not found"});
    }

}};

// Create or register new user
const registerUser = async (req, res) => {
  const { email, firstName, lastName, phoneNumber, password } = req.body; 

  try {
    // Checks for existing user
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
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





