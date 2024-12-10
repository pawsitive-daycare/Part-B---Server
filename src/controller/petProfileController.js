// const { PetProfile } = require("../models/petProfile");

// // register pet
// const registerPetProfile = async (req, res) => {
//     const { user, name, animal, breed, age, gender, notes } = req.body;

//     try {
//         const newpetProfile = new PetProfile({ user, name, animal, breed, age, gender, notes });
//         await newpetProfile.save();
//         res.status(201).json(newpetProfile);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// // update pet profile
// const updatePetProfile = async (req, res) => {
//     const { user, name, animal, breed, age, gender, notes } = req.body;
//     try {
//         const petToUpdate = await PetProfile.findById(req.params.id);
//         if (!petToUpdate) {
//             return res.status(400).json({ message: "Pet not found" });
//         }
//         petToUpdate.user = user;
//         petToUpdate.name = name;
//         petToUpdate.animal = animal;
//         petToUpdate.breed = breed;
//         petToUpdate.age = age;
//         petToUpdate.gender = gender;
//         petToUpdate.notes = notes;

//         await petToUpdate.save();
//         res.status(200).json({message: "pet updated successfully"});
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// // delete pet profile

// const deletePetProfile = async (req, res) => {
//     try {
//         const petToDelete = await PetProfile.findById(req.params.id);
//         if (!petToDelete) {
//             return res.status(400).json({ message: "Pet not found" });
//         }
//         await petToDelete.remove();
//         res.status(200).json({ message: "Pet deleted successfully" });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };