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

async function getAllTasks() {
  const pool = await getPool();
  const result = await pool.request().query("SELECT * FROM Tasks");
  return result.recordset;
}

async function getTaskById(id) {
  const pool = await getPool();
  const result = await pool
    .request()
    .input("id", mssql.Int, id)
    .query("SELECT * FROM Tasks WHERE id = @id");
  return result.recordset[0];
}

async function createTask(Task) {
  const { title, status, description } = Task;
  const pool = await getPool();
  await pool
    .request()
    .input("title", mssql.VarChar, title)
    .input("status", mssql.VarChar, status)
    .input("description", mssql.VarChar, description)
    .query(
      "INSERT INTO Tasks (title, status, description, createdAt, updatedAt) VALUES (@title, @status, @description, GETUTCDATE(), GETUTCDATE())"
    );
}

async function updateTask(id, Task) {
  const { title, status, description } = Task;
  const pool = await getPool();
  await pool
    .request()
    .input("id", mssql.Int, id)
    .input("title", mssql.VarChar, title)
    .input("status", mssql.VarChar, status)
    .input("description", mssql.VarChar, description)
    .query(
      "UPDATE Tasks SET title = @title, status = @status, description = @description, updatedAt = GETUTCDATE() WHERE id = @id"
    );
}

async function deleteTask(id) {
  const pool = await getPool();
  await pool
    .request()
    .input("id", mssql.Int, id)
    .query("DELETE FROM Tasks WHERE id = @id");
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
