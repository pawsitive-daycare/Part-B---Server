
const userRoutes = require("../src/routes/user_routes");
const petRoutes = require("../src/routes/petProfile_routes");
const express = require("express");
const app = express();

// app.use(cors());

app.use(express.json());

app.get("/",(request, response) => {
    response.send("Home Route");
})


app.use("/users", userRoutes);

app.use("/pets", petRoutes);


module.exports = {app};
