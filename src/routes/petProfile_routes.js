
const { registerPetProfile, updatePetProfile, deletePetProfile } = require("../controller/petProfileController");
const express = require ("express");
const router = express.Router();




// register pet route
router.post("/register", registerPetProfile);

// update pet route
router.put("/:id", updatePetProfile);

// delete pet route
router.delete("/:id", deletePetProfile);

module.exports = router;
