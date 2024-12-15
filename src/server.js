// This file is the entry point for the server. It sets up the server and routes.
const express = require("express");
const cors = require("cors");
const app = express();


app.use(cors());
  
app.use(express.json());

app.get("/",(request, response) => {
    response.send("Home Route");
})

// Importing the user routes
const userRoutes = require("../src/routes/user_routes");
app.use("/users", userRoutes);


const bookingRoutes = require("../src/routes/booking_routes")
app.use("/mybookings", bookingRoutes);


module.exports = {
  app
};
