const { userModel } = require("../models/user");

// Create or register new user

router.post("/register", async (req, res) => {
  const { email, username, firstName, lastName, password } = req.body;
  
  try {
    const user = new User({ email, username, firstName, lastName, password });
    await user.save();
    res.status(201).json({ message: "User has been created!" });
  } catch (error) {
    res.status(400).send(error);
  }
});
