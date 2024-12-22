const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");



const { userModel } = require("../models/user");
const { config } = require("dotenv");
config();

const SECRET_KEY = process.env.SECRET_KEY;
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
      return res.status(404).json({ message: "User not found" });
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
    //Checks for existing user
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new userModel({
      email,
      firstName,
      lastName,
      phoneNumber,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Compare provided password with the hashed password in the database
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    // Generate token if login is successful
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: "7d",
    });
    res.status(200).json({ message: "Login successful", userId: user._id ,token });
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

// const isPasswordValid = await bcrypt.compare(password, user.password);
// if (!isPasswordValid) {
//   return res.status(401).json({ message: "Invalid credentials" });
// }
// token

// async (req, res) => {
//   console.log("Access to register a user");
//   try {
//     const { email, firstName, lastName, phoneNumber, password } = req.body;
//     console.log(`User creating on process`);
//     const newUser = {
//       email,
//       password,
//       firstName,
//       lastName,
//       phoneNumber,
//     };

//     const insertedUser = await userModel.create(newUser);
//     console.log(insertedUser);

//     const token = jwt.sign(
//       {
//         type: "JWT",
//         email: req.body.email,
//         firstName: req.body.firstName,
//       },
//       SECRET_KEY,
//       {
//         expiresIn: "30m",
//       }
//     );
//     return res.status(201).json({
//       code: 201,
//       message: `Thanks for registering! ${insertedUser.firstName}`,
//       user_id: insertedUser._id,
//       firstName: insertedUser.firstName,
//       token: token,
//     });
//   } catch (error) {
//     console.log(JSON.stringify(error));

//     res.status(500).send({ error: error.keyValue });
//   }
// };

// Login user
// const loginUser = async (req, res) => {
//   console.log("Access to login");
//   try {
//     const user = await userModel.findOne(req.body);
//     if (user.password === req.body.password) {
//       const token = jwt.sign(
//         {
//           email: req.body.email,
//           firstName: req.body.firstName,
//         },
//         SECRET_KEY,
//         {
//           expiresIn: "30m",
//         }
//       );
//       return res.status(200).json({
//         code: 200,
//         message: `Welcome back to PAWsitiveDaycare!,
//       ${user.firstName}`,
//         user_id: user._id,
//         firstName: user.firstName,
//         token: token,
//       });
//     } else {
//       return res.status(404).send({ error: "LogIn failed. Please try again" });
//     }
//   } catch (error) {
//     console.log(JSON.stringify(error));
//     res.status(500).send({ error: error.message });
//   }
// };
