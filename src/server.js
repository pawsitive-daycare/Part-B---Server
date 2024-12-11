
const userRoutes = require("../src/routes/user_routes");
const petRoutes = require("../src/routes/petProfile_routes");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(
    cors({
      origin: ["http://localhost:8080", "https://pawsitivedaycare-app-85af86a9e0d4.herokuapp.com/", "https://zippy-tartufo-996534.netlify.app/"],
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true, // Allow sending cookies across origins
    })
  );
  
app.use(express.json());

app.get("/",(request, response) => {
    response.send("Home Route");
})


app.use("/users", userRoutes);

app.use("/pets", petRoutes);


module.exports = {app};
