import express from "express";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../controllers/task.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const taskRouter = express.Router();

taskRouter.use(protect);

taskRouter.post("/", createTask);
taskRouter.get("/", getTasks);
taskRouter.put("/:id", updateTask);
taskRouter.delete("/:id", deleteTask);

export default taskRouter;
