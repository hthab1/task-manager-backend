const { createCustomError } = require("../errors/customErrors");
const asyncWrapper = require("../middleware/async");
const Task = require("../models/Task");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json({ success: true, data: { tasks, total: tasks.length } });
});

const createTask = asyncWrapper(async (req, res) => {
  const newTask = new Task(req.body);
  const savedTask = await newTask.save();
  res.status(201).json(savedTask);
  // res.json(req.body);
});

const getTask = asyncWrapper(async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.status(200).json(task);
});

const updateTask = asyncWrapper(async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  res.status(200).json(task);
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) {
    return next(
      createCustomError(`No task is found by the is ${req.params.id}`, 404)
    );
  }
  res.status(200).json("Task has been deleted!");
});

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
