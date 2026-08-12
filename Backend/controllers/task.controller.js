import Task from "../models/task.model.js";

export const createTask = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Task title is required",
      });
    }

    const task = await Task.create({
      title: title.trim(),
      user: req.user._id,
    });

    return res.status(201).json({
      success: true,
      error: false,
      data: task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: "Unable to create task",
    });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      error: false,
      data: tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: "Unable to fetch tasks",
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    const task = await Task.findOne({ _id: id, user: req.user._id });

    if (!task) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Task not found",
      });
    }

    if (title !== undefined) {
      if (!title.trim()) {
        return res.status(400).json({
          success: false,
          error: true,
          message: "Task title is required",
        });
      }

      task.title = title.trim();
    }

    if (completed !== undefined) {
      task.completed = completed;
    }

    await task.save();

    return res.status(200).json({
      success: true,
      error: false,
      data: task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: "Unable to update task",
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id, user: req.user._id });

    if (!task) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      message: "Task deleted successfully",
      data: task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: "Unable to delete task",
    });
  }
};
