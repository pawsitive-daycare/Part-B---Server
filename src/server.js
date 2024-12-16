// This file is the entry point for the server. It sets up the server and routes.
const express = require("express");
const cors = require("cors");
const app = express();


const allowedOrigins = ['https://zippy-tartufo-996534.netlify.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow request
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Allow credentials (cookies, headers)
};

app.use(cors(corsOptions)); // Apply CORS middleware

app.options('*', cors(corsOptions)); // Enable pre-flight request for all routes

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
