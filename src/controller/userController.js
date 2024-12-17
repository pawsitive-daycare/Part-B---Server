const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SECRET_KEY = process.env.SECRET_KEY;

const { userModel } = require("../models/user");
const { config } = require("dotenv");
config();
// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a user by ID
const getUser = async (req, res) => {
  try {
    const { id } = req.params; // Extract the ID from the request parameters
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create or register new user
const registerUser = async (req, res) => {
  console.log("Access to register a user")
  try {
    // 1. Create a new user object with values passed in from the request
    const { email, title, firstName, lastName, phoneNumber, password } = req.body
    console.log(`User creating on process`)
    // const userObject = await UserModel.findOne({ email: email })
    const newUser = {
      email,
      password,
      title,
      firstName,
      lastName,
      phoneNumber
    }
    // 2. Insert the new user into the database
    const insertedUser = await UserModel.create(newUser)
    console.log(insertedUser)
    // 3. Send the new user with 201 status
    const token = jwt.sign({
      type: 'JWT',
      email: req.body.email,
      firstName: req.body.firstName
    }, SECRET_KEY, {
      expiresIn: '30m',
      issuer: 'PAWFUL_Dev'
    })
    return res.status(201).json({
      code: 201,
      message: `Thanks for registering! ${insertedUser.firstName}`,
      user_id: insertedUser._id,
      firstName: insertedUser.firstName,
      token: token
    })
  } catch (err) {
    res.status(500).send({ error: err.keyValue })
  }
}
// async (req, res) => {
//   const { email, firstName, lastName, phoneNumber, password } = req.body;

//   try {
//     // Checks for existing user
//     const userExists = await userModel.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: "User already exists" });
//     }
//     const hashedPassword = await bcrypt.hash(password, 12);

//     const newUser = new userModel({
//       email,
//       firstName,
//       lastName,
//       phoneNumber,
//       password: hashedPassword,
//     });
//     await newUser.save();
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

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
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // token
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    res.status(200).json({ userId: user._id, token  });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user
const updateUser = async (req, res) => {
  const { email, firstName, lastName, phoneNumber, password, isAdmin } =
    req.body;

  try {
    // check if user exists
    const userToUpdate = await userModel.findById(req.params.id);
    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }
    // checks for duplicates
    const duplicate = await userModel.findOne({ email }).lean().exec();
    if (duplicate && duplicate._id.toString() !== _id) {
      return res
        .status(409)
        .json({ message: "Username already exists in the database" });
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
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to save the data! Please try again later." });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await userModel.findByIdAndDelete(_id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
};
