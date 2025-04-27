// import express from "express";
// const app = express();
// const PORT = process.env.PORT || 5000;
// import path from "path";
// import mongoose from "./db/db.js";
// import cors from "cors";
// import taskRoutes from './routes/taskRoutes.js';  
// import connectToDb from "./db/db.js";

// app.use(
//     cors({
//         origin:[
//             'http://localhost:5173',
//             'http://localhost:5174',
//             'https://batch11-mern-stack-1.onrender.com',
//             'https://batch11-mern-stack.vercel.app/',
//         ],
//         methods: ["GET","PUT", "POST", "DELETE"],
//         credentials :true,
//         allowedHeaders: ["Content-Type" , "Authorization"],
//     }),
// );

// const __dirname = path.resolve();

// Serve static frontend files
// app.use(express.static(path.join(__dirname,"dist")));

// app.use(express.json());

// connect to db
// connectToDb()

// middlewares

// app.get("/",(req,res)=>{
//     res.send("server is active")
// })

// app.use("/api/tasks",taskRoutes);


// app.get("*",(req,res) =>{
//   res.sendFile(path.join(__dirname, "dist", "index.html"));
// });

// app.listen(PORT,()=>{
//     console.log("server is listening 5000");
// });

import express from "express";
const app = express();
const PORT = process.env.PORT || 5000;
import path from "path";
import mongoose from "./db/db.js";
import cors from "cors";
import taskRoutes from './routes/taskRoutes.js';  
import connectToDb from "./db/db.js";

// CORS Setup
app.use(
    cors({
        origin: [
            'http://localhost:5175',
            'http://localhost:5174',
            'https://batch11-mern-stack-1.onrender.com',
            'https://batch11-mern-stack.vercel.app/',
        ],
        methods: ["GET", "PUT", "POST", "DELETE"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Fix for __dirname in ESM
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Middleware
app.use(express.json());

// Connect to Database
connectToDb();

// Routes
app.get("/", (req, res) => {
    res.send("Server is active");
});

app.use("/api/tasks", taskRoutes);


app.use(express.static(path.join(__dirname, "dist")));

// Start server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});


