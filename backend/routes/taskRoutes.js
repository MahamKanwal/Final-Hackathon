// import express from "express";
// import { createTask, getAllTasks, updateTask, deleteTask, moveTask } from "../controllers/taskController.js";
// import authenticate from "../Middlewares/authenticate.js";

// const router = express.Router();

// // All routes should be protected
// router.post("/tasks", authenticate, createTask);        // Create Task
// router.get("/tasks", authenticate, getAllTasks);         // Get All Tasks
// router.put("/tasks/:id", authenticate, updateTask);      // Edit Task
// router.delete("/tasks/:id", authenticate, deleteTask);   // Delete Task
// router.patch("/tasks/:id/move", authenticate, moveTask); // Move Task (To Do -> In Progress -> Done)

// export default router;

import express from "express";
import { createTask, getAllTasks, updateTask, deleteTask, moveTask } from "../controllers/taskController.js";
import authenticate from "../Middlewares/authenticate.js";

const router = express.Router();

router.post("/", authenticate, createTask);  // Check this route
router.get("/", authenticate, getAllTasks);
router.put("/:id", authenticate, updateTask);
router.delete("/:id", authenticate, deleteTask);
router.patch("/:id/move", authenticate, moveTask);

export default router;
