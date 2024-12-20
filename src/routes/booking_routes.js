const express = require('express');
const { getAllbookings, getBooking, makeBooking, deleteBooking, updateBooking, getBookingById} = require('../controller/bookingController');
const { auth } = require('../middleware/auth');


const router = express.Router();

//
router.get("/", auth, getAllbookings);

router.get("/:id", getBooking);

router.post("/", auth,  makeBooking);

router.put("/:id", updateBooking);

router.delete("/:id", auth, deleteBooking);

router.get("/:id", auth,  getBookingById);

module.exports = router;