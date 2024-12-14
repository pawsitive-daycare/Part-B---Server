const { userModel } = require("../models/user");
const { bookingModel } = require("../models/booking");

// all bookings
const getAllbookings = async (req, res) => {
  try {
    const bookings = await bookingModel.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// get a booking by user id
const getBooking = async (req, res) => {
  try {
    _id = req.param._id;
    const bookings = await bookingModel.find({ user: userId });
    if (!bookings) {
      return res.status(400).json({ message: "booking not found" });
    }
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// create a booking
const makeBooking = async (req, res) => {
  try {
    const { user, service, date, pet } = req.body;

    const userObject = await userModel.findOne({_id: user});

    const newBooking = {
      user: userObject,
      service: {
        name: service.name,
        price: service.price,
      },
      date: {
        year: date.year,
        month: date.month,
        day: date.day,
        time: date.time,
      },
      pet: {
        animal: pet.animal,
        name: pet.name,
        breed: pet.breed,
        age: pet.age,
      },
    };
    const savedBooking = await bookingModel.create(newBooking);

    const populatedBooking = await bookingModel
      .findById(savedBooking._id)
      .populate("user");
    res.status(201).json(populatedBooking);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to create booking. Please try again later." });
  }
};

// update a booking
// const updateBooking = async (req, res) => {
//   const { user, service, date, pet } = req.body;
//   try{
//     const bookingToUpdate = await bookingModel.findById(req.params.id);
//     if (!bookingToUpdate) {
//       return res.status(400).json({ message: "Booking not found" });
//     }
//     const userObject = await userModel.findOne({ _id: user })

//     bookingToUpdate.user = userObject;
//     bookingToUpdate.service = {
//       name: service.name,
//       price: service.price
//     };
//     bookingToUpdate.date = {
//       date: date.date
//     }
//     bookingToUpdate.pet = pe;

//     await bookingToUpdate.save();
//     res.status(200).json({message: "booking updated successfully"});
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// }

// delete a booking

module.exports = {
  getAllbookings,
  getBooking,
  makeBooking,
};
