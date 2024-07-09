const mssql = require("mssql");
const { getPool } = require("../configurations/dbConnection");
// const bcrypt = require("bcryptjs");

async function createUser(user) {
  const { userName, password, role, email } = user;
  const pool = await getPool();
  await pool
    .request()
    .input("userName", mssql.VarChar, userName)
    .input("email", mssql.VarChar, email)
    .input("password", mssql.VarChar, password)
    .query(
      "INSERT INTO Users (UserName, Password, Role, Email) VALUES (@userName, @password, 'customer', @email)"
    );
}

async function getUserByEmail(email) {
  const pool = await getPool();
  const result = await pool
    .request()
    .input("email", mssql.VarChar, email)
    .query("SELECT Top 1 * FROM Users WHERE email = @email");
  return result.recordset[0];
}

module.exports = {
  createUser,
  getUserByEmail,
};
