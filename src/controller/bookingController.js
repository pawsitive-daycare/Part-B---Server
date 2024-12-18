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
  console.log("Access to find user's bookings by user_id:", req.body_id);
  try {
    const _id = req.params.id;  
    const booking = await bookingModel.find({ user: _id });  

    if (booking.length === 0) {  
      return res.status(400).json({ message: "No bookings found" });
    }
    res.status(200).json(booking);  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// 

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

    const populatedBooking = await bookingModel.findById(savedBooking._id).populate("user");
    res.status(201).json(populatedBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create booking. Please try again later." });
  }
};

// update a booking

const updateBooking = async (req, res) => {
  const { user, service, date, pet} = req.body;
  const updatedBooking = {user, service, date, pet}
  try {
    const booking = await bookingModel.findByIdAndUpdate(req.params.id, updatedBooking)
    if (booking) {
      res.send(booking)
    } else {
      res.status(404).send({error: "booking not found"})
    } 
  } catch (error) {
      res.status(500).send({ error: error.message })
  }

}

// delete a booking

// const deleteBooking = async (req, res) => {
//   try {
//     const booking = await bookingModel.findByIdAndDelete(req.params.id)
//     console.log("Booking deleted")
//     res.status(200).send({ msg: "Booking is deleted successfully."})
//     return ;
//   }
//   catch (error) {
//     res.status(500).send({ error: error.message })
//   }
// };
const deleteBooking = async (req, res) => {
  try {
    const userId = req.user._id; // Get the user ID from the authenticated user
    const bookingId = req.params.id;

    // Find the booking by ID
    const booking = await bookingModel.findById(bookingId);

    // Check if the booking exists
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Check if the user is the creator of the booking
    if (booking.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: "You are not authorized to delete this booking" });
    }

    // Delete the booking
    await bookingModel.findByIdAndDelete(bookingId);
    console.log("Booking deleted");
    res.status(200).json({ message: "Booking is deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getAllbookings,
  getBooking,
  makeBooking,
  updateBooking,
  deleteBooking
};
