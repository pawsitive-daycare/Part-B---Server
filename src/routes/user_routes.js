
const {getAllUsers, getUser, registerUser, loginUser, updateUser, deleteUser} = require("../controller/userController");

const express = require ("express");
const router = express.Router();


// Get all users
router.get("/", getAllUsers);

// Get a user by ID

router.get("/:id", getUser);

// Register user
router.post("/signup", registerUser);

// Login user

router.post("/login", loginUser);

// Update user

router.put("/:id", updateUser);

// Delete user

router.delete("/:id", deleteUser);

module.exports = router;
