const express = require("express");
const router = express.Router();
const authService = require("../services/authService");

router.post("/register", async (req, res) => {
  const user = req.body;
  try {
    await authService.createUser(user);
    res.status(201).send("user registered successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error registering user");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const token = await authService.login(email, password);
  if (token == null) return res.status(401).send("Invalid credentials");
  res.json({ token });
});

module.exports = router;
