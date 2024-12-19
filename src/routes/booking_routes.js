const express = require('express');
const { getAllbookings, getBooking, makeBooking, deleteBooking, updateBooking} = require('../controller/bookingController');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();

//
router.get("/",  getAllbookings);

router.get("/:id",  getBooking);

router.post("/",   makeBooking);

router.put("/:id", updateBooking);

router.delete("/:id",  deleteBooking);



module.exports = router;