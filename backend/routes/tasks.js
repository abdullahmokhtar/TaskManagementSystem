const express = require("express");
const router = express.Router();
const taskService = require("../services/taskService");

router.get("/", async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching tasks");
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const task = await taskService.getTaskById(id);
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching task");
  }
});

router.post("/", async (req, res) => {
  const task = req.body;
  try {
    await taskService.createTask(task);
    res.status(201).send("task created successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating task");
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const task = req.body;
  try {
    await taskService.updateTask(id, task);
    res.status(200).send("task updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating task");
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await taskService.deleteTask(id);
    res.status(200).send("task deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting task");
  }
});

module.exports = router;
