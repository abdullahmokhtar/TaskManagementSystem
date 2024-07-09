const mssql = require("mssql");
const { getPool } = require("../configurations/dbConnection");

async function getAllTasks(userId) {
  const pool = await getPool();
  const result = await pool
    .request()
    .input("userId", mssql.Int, userId)
    .query("SELECT * FROM Tasks where userId = @userId");
  return result.recordset;
}

async function getTaskById(id, userId) {
  const pool = await getPool();
  const result = await pool
    .request()
    .input("id", mssql.Int, id)
    .input("userId", mssql.Int, userId)
    .query("SELECT Top 1 * FROM Tasks WHERE id = @id AND userId = @userId");
  return result.recordset[0];
}

async function createTask(Task) {
  const { title, status, description, userId } = Task;
  const pool = await getPool();
  await pool
    .request()
    .input("title", mssql.VarChar, title)
    .input("status", mssql.VarChar, status)
    .input("description", mssql.VarChar, description)
    .input("userId", mssql.Int, userId)
    .query(
      "INSERT INTO Tasks (title, status, description, createdAt, updatedAt, userId) VALUES (@title, @status, @description, GETUTCDATE(), GETUTCDATE(), @userId)"
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
