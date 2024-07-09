const bcrypt = require("bcryptjs");
const authRepository = require("../repositories/authRepository");
const jwt = require("jsonwebtoken");

async function createUser(user) {
  const { userName, password, email, rePassword } = user;
  if (!userName || !password || !email || !rePassword) {
    throw new Error("Please provide all required fields");
  }
  if (password !== rePassword) {
    throw new Error("Confirm Password and Password do not match");
  }
  user.password = await bcrypt.hash(password, 10);
  await authRepository.createUser(user);
}

async function login(email, password) {
  if (!email || !password) throw new Error("Please provide email and password");
  const user = await authRepository.getUserByEmail(email);
  if (user == null) throw new Error("user Not Found");
  const isPasswordValid = await bcrypt?.compare(password, user.Password);
  if (!isPasswordValid) return null;

  const token = jwt.sign(
    { id: user.Id, role: user.Role },
    process.env.SECRET_KEY,
    {
      expiresIn: "24h",
    }
  );
  return token;
}

module.exports = {
  createUser,
  login,
};
