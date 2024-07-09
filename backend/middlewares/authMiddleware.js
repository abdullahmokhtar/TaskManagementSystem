const jwt = require("jsonwebtoken");
require("dotenv").config();

const useAuth = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .send({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send({ message: "Invalid token" });
  }
};

module.exports = useAuth;
