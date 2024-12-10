
const userRoutes = require("../src/routes/user_routes");
const express = require("express");
const app = express();

// app.use(cors());

app.use(express.json());

app.get("/",(request, response) => {
    response.send("Home Route");
})


app.use("/users", userRoutes);

module.exports = {
    app
}