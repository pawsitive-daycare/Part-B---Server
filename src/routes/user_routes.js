
const {getAllUsers, getUser, registerUser, loginUser, updateUser, deleteUser} = require("../controller/userController");

const express = require ("express");
const { auth } = require("../middleware/auth");
const router = express.Router();


// Get all users
router.get("/", auth, getAllUsers);

// Get a user by ID

router.get("/:id", auth ,getUser);

// Register user
router.post("/signup", registerUser);

// Login user

router.post("/login", loginUser);

// Update user

router.put("/:id", auth, updateUser);

// Delete user

router.delete("/:id", auth ,deleteUser);

module.exports = router;
