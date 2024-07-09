const jwt = require("jsonwebtoken");
const taskRepository = require("../repositories/taskRepository");

async function getAllTasks(userId) {
  return await taskRepository.getAllTasks(userId);
}

async function getTaskById(id, userId) {
  const task = await taskRepository.getTaskById(id, userId);
  if (!task) {
    throw new Error("task not found");
  }
  return task;
}

async function createTask(task) {
  const { title, status, description, userId } = task;
  if (!title || !status || !description || !userId) {
    throw new Error("Please provide all required fields");
  }
  if (
    !["pending", "inprogress", "Completed"].includes(
      status.trim().replace(" ", "")
    )
  )
    throw new Error("Please provide valid status");

  await taskRepository.createTask(task);
}

async function updateTask(id, task, userId) {
  const existingTask = await taskRepository.getTaskById(id, userId);
  if (!existingTask) {
    throw new Error("task not found");
  }
  await taskRepository.updateTask(id, task);
}

async function deleteTask(id, userId) {
  const existingTask = await taskRepository.getTaskById(id, userId);
  if (!existingTask) {
    throw new Error("task not found");
  }
  await taskRepository.deleteTask(id);
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
