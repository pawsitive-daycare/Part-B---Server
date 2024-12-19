const express = require('express');
const { getAllbookings, getBooking, makeBooking, deleteBooking, updateBooking} = require('../controller/bookingController');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();

//
router.get("/", verifyToken, getAllbookings);

router.get("/:id", verifyToken, getBooking);

router.post("/", verifyToken,  makeBooking);

router.put("/:id", updateBooking);

router.delete("/:id", verifyToken, deleteBooking);



module.exports = router;