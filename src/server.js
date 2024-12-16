// This file is the entry point for the server. It sets up the server and routes.
const express = require("express");
const cors = require("cors");
const app = express();


const allowedOrigins = ['https://zippy-tartufo-996534.netlify.app'];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // Allow credentials (cookies, auth headers)
  })
);


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
