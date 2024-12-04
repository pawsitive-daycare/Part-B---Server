const { userModel } = require("../models/user");

// Create or register new user

const registerUser = async (req, res) => {
  // Destructure the request body
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
      // if the provided password is incorrect
      return res.status(400).json({ message: "Incorrect password" });
    }
  }
};
// Update user

// Delete user

// Get all users

// Get user by ID



