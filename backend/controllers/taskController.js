// import bcrypt from "bcrypt";
// import User from "../models/user.js";
// import "dotenv/config";
// import JWT from "jsonwebtoken";
// import userSchema from "../schema/userSchema.js";
// import chalk from "chalk";

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (user) {
//       const checkPassword = bcrypt.compareSync(password, user.password);
//       if (checkPassword) {
//         var token = JWT.sign({ userId: user._id }, process.env.JWT_SECRET);

//         res
//           .status(200)
//           .json({ status: 200, message: "Login Successfull", user, token });
//       } else {
//         res.status(401).json({ status: 401, message: "Incorrect Password" });
//       }
//     } else {
//       res.status(404).json({ status: 404, message: "User not found" });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({ error: err, status: 400 });
//   }
// };
// const createUser = async (req, res) => {
//   console.log(chalk.bgCyan("incoming call to signup api"));
//   if (!req.body) {
//     return req.status(400).json({ message: "Bad request" });
//   }
//   try {
//     const user = await userSchema.validateAsync(req.body);
//     const password = await bcrypt.hash(user.password, 10);
//     const newUser = await User.create({ ...user, password: password });

//     await newUser.save();

//     res.status(201).json({
//       message: "User created successfully",
//       user: { id: newUser.id, email: newUser.email },
//     });
//   } catch (error) {
//     if (error?.code === 11000) {
//       return res.status(409).json({
//         message: "Duplicate email - Email already exists",
//         error: error.message,
//       });
//     }
//     console.error(chalk.bgRed("Signup Error:"), error);
//     res.status(500).json({
//       message: "Internal Server Error",
//       error: error.message,
//     });
//   }
// };

// const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     res.status(400).json({ error: err, status: 400 });
//   }
// };
// const getLoggedInUser = async (req, res) => {
//   try {

//     const {userId}= req.user
   
//     const user = await User.findById(userId)

//     if (!user) {
//       return res.status(404).json({ status: 404, message: "User not found" });
//     }

//     res.status(200).json({ status: 200, user });
//   } catch (error) {
//     console.error("Error fetching user details:", error);
//     res.status(500).json({
//       status: 500,
//       message: "Internal Server Error",
//       error: error.message,
//     });
//   }
// };
// const deleteUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await User.findByIdAndDelete(id);
//     res.json({ message: "User deleted successfully" });
//   } catch (err) {
//     res.status(400).json({ error: err, status: 400 });
//   }
// };
// const updateUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findByIdAndUpdate(id, req.body, { new: true });
//     res.json({ message: "User updated successfully", user });
//   } catch (err) {
//     res.status(400).json({ error: err, status: 400 });
//   }
// };
// export {
//   login,
//   getAllUsers,
//   createUser,
//   deleteUser,
//   updateUser,
//   getLoggedInUser,
// };



import Task from "../models/task.js";

// Create Task
export const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;
    const task = new Task({
      title,
      description,
      assignedTo,
      status: "To Do",
    });
    await task.save();
    res.status(201).json({ success: true, task });
  } catch (error) {
    console.error("Create Task Error:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get All Tasks
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedTo", "name email");
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error("Get All Tasks Error:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Update Task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, assignedTo } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, assignedTo },
      { new: true }
    );

    res.status(200).json({ success: true, task: updatedTask });
  } catch (error) {
    console.error("Update Task Error:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete Task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete Task Error:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Move Task (Change Status)
export const moveTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // new status: "In Progress" or "Done"

    const validStatuses = ["To Do", "In Progress", "Done"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.status(200).json({ success: true, task: updatedTask });
  } catch (error) {
    console.error("Move Task Error:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export default { createTask, getAllTasks, updateTask, deleteTask, moveTask }
