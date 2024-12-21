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
  // console.log("Access to find user's bookings by user_id:", req.params.id);
  try {
    const _id = req.params.id; 
    // console.log("User id: ", _id) ;
    const booking = await bookingModel.find({ user: _id });  

    if (booking.length === 0) {  
      return res.status(400).json({ message: "No bookings found" });
    }
    res.status(200).json(booking);  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get booking by it's id
// const getBookingById = async (req, res) => {
//   console.log("Access to find booking by booking_id:", req.params.id);
//   try {
//     const bookingId = req.params.id;
//     console.log("Booking id: ", bookingId);
//     const booking = await bookingModel.findById(bookingId);

//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }
//     res.status(200).json(booking);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const updateBooking = async (req, res) => {
  // Check if req.user is defined, if not, return an error
  if (!req.user) {
    return res.status(400).json({ message: "No user associated with request" });
  }

  try {
    // Find the booking by ID and ensure it's owned by the logged-in user
    let booking = await bookingModel.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Update the booking with the new data
    booking = await bookingModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,         // Return the updated document
      runValidators: true, // Ensure validation is run
    });

    // Log success message
    console.log(`Booking updated: ${booking}`);

    // Send the updated booking as the response
    res.json(booking);
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ message: error.message });
  }
};

// const getBookingById = async (req, res) => {
//   const { bookingId } = req.params._id;
//   console.log("Access to find booking by booking_id:", req.params.id);
//   try {
//     console.log("Booking id: ", bookingId);
//     const booking = await bookingModel.findById(bookingId);
//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }
//     res.status(200).json(booking);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }
// 

// create a booking
const makeBooking = async (req, res) => {
  const { service, date, pet } = req.body;
  const user = req.user;
  
  console.log("Req user: ", req.user);
  // console.log("User id: ", req.user._id);
  if (!user) {
    console.log("No user associated with request");
    return res.status(400).json({ message: "No user associated with request" }); 
  }
    try {    
    const userId = user._id
    const newEntry = {
      user: user,
      service: service,
      date: date,
      pet: pet,
    };
    
    console.log("saving booking's user id:", userId);
    const savedBooking = await bookingModel.create(newEntry);
    // const populatedBooking = await bookingModel.find(savedBooking).populate("user", "email");
    console.log("Booking created successfully");
    const populatedBooking = await bookingModel.findById(savedBooking._id).populate("user");
    console.log("booking populated with user email:", populatedBooking);
    res.status(201).json(populatedBooking);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create booking. Please try again later." });
  }
};

// update a booking

// const updateBooking = async (req, res) => {
//   const { service, date, pet} = req.body;
//   const updatedBooking = {user, service, date, pet}
//   try {
//     const booking = await bookingModel.findByIdAndUpdate(req.params.id, updatedBooking, {new: true})
//     if (booking) {
//       res.send(booking)
//     } else {
//       res.status(404).send({error: "booking not found"})
//     } 
//   } catch (error) {
//       res.status(500).send({ error: error.message })
//   }

// }

// delete a booking
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
  deleteBooking,
  // getBookingById,
};
