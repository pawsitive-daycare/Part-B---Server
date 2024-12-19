

const {getAllUsers, getUser, registerUser, loginUser, updateUser, deleteUser} = require("../controller/userController");

const express = require ("express");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();


// Get all users
router.get("/", verifyToken, getAllUsers);

// Get a user by ID

router.get("/:id", verifyToken ,getUser);

// Register user
router.post("/signup", registerUser);

// Login user

router.post("/login", loginUser);

// Update user

router.put("/:id", verifyToken, updateUser);

// Delete user

router.delete("/:id", verifyToken ,deleteUser);

module.exports = router;
