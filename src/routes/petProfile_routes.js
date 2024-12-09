const express = require ("express")
const router = express.Router()
const petProfileController = require("../controller/petProfileController")

// register pet route
router.post("/register", petProfileController.registerPetProfile);

// update pet route
router.put("/:id", petProfileController.updatePetProfile);

// delete pet route
router.delete("/:id", petProfileController.deletePetProfile);

module.exports = {
    router
}