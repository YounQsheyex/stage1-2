const TASK = require("../models/taskModel.js");

const createTask = async (req, res) => {
  const { userId } = req.user;
  const { title, description, priority } = req.body;
  const taskExist = await TASK.findOne({ title });
  if (taskExist) {
    return res.status(400).json({ message: "Task Already Exist" });
  }
  if (!title || !description || !priority) {
    return res.status(400).json({ message: "Please Enter all Fields" });
  }
  try {
    const create = await TASK.create({
      title,
      description,
      priority,
      admin: userId,
    });
    res
      .status(201)
      .json({ success: true, message: "Task Created Succesfully", create });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server error" });
  }
};

const allTasks = async (req, res) => {
  try {
    const allTask = await TASK.find();
    if (allTask.length === 0) {
      return res.status(404).json({ message: "No task found" });
    }
    res.status(200).json(allTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const singleTask = async (req, res) => {
  const id = req.params.id;

  try {
    const task = await TASK.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const { title } = await TASK(req.body);
    const taskAlradyExist = await TASK.findOne({ title });
    const taskExist = await TASK.findById(id);
    if (!taskExist) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (taskAlradyExist) {
      return res.status(400).json({ message: "Task already exist" });
    }
    const updateTask = await TASK.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res
      .status(201)
      .json({ message: "Task Updated Succesfully", updateTask });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const taskExist = await TASK.findById({ _id: id });
    if (!taskExist) {
      return res.status(404).json({ message: "Task not found" });
    }
    await TASK.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "Task Deleted Succesfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { allTasks, createTask, update, deleteTask, singleTask };
