import express from "express";
import { createTask, getAllTasks, updateTask, deleteTask, moveTask } from "../controllers/taskController.js";
import authenticate from "../Middlewares/authenticate.js";

const router = express.Router();

router.post("/", authenticate, createTask); 
router.get("/", authenticate, getAllTasks);
router.put("/:id", authenticate, updateTask);
router.delete("/:id", authenticate, deleteTask);
router.patch("/:id/move", authenticate, moveTask);

export default router;
