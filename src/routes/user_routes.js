const express = require ("express")
const router = express.Router()
const userController = require("../controller/userController")

// Get all users
router.get("/", userController.getAllUsers);

// Get a user by ID

router.get("/:id", userController.getUser);

// Register user
router.post("/signup", userController.registerUser);

// Login user

router.post("/login", userController.loginUser);

// Update user

router.put("/:id", userController.updateUser);

// Delete user

router.delete("/:id", userController.deleteUser);

module.exports = {
    router
}