const mssql = require("mssql");
require("dotenv").config();

const config = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  server: process.env.SERVER,
  database: process.env.DATABASE,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

async function getPool() {
  const pool = await mssql.connect(config);
  return pool;
}

module.exports = {
  getPool,
};
