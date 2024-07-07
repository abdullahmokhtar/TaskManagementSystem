const taskRepository = require("../repositories/taskRepository");

async function getAllTasks() {
  return await taskRepository.getAllTasks();
}

async function getTaskById(id) {
  const task = await taskRepository.getTaskById(id);
  if (!task) {
    throw new Error("task not found");
  }
  return task;
}

async function createTask(task) {
  const { title, status, description } = task;
  if (!title || !status || !description) {
    throw new Error("Please provide all required fields");
  }
  await taskRepository.createTask(task);
}

async function updateTask(id, task) {
  const existingTask = await taskRepository.getTaskById(id);
  if (!existingTask) {
    throw new Error("task not found");
  }
  await taskRepository.updateTask(id, task);
}

async function deleteTask(id) {
  const existingTask = await taskRepository.getTaskById(id);
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
