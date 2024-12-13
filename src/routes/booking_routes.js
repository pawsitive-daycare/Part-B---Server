const express = require('express');
const { getAllbookings, getBooking, makeBooking, updateBooking } = require('../controller/bookingController');
const router = express.Router();

//
router.get("/", getAllbookings);

router.get("/:id", getBooking);

router.post("/", makeBooking);

router.put("/:id", updateBooking);






module.exports = router;