// import jwt from "jsonwebtoken";
// import User from "../models/user.js";
// import "dotenv/config";
// import chalk from "chalk";

// const authenticate = async (req, res, next) => {
//     try{
        
//         // Get token from  Authorization Header
//         let token;
//         if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
//             token - req.headers.authorization.split(" ")[1];   
//         }

//         if(!token){
//             return res.status(401).json({ success: false, message: "Unauthorized - No token provided"});
//         }
//         console.log("token-->", token);

//         // Verify JWT token using the correct secret
//         const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
//         console.log(chalk.blue("Decoded Token:", decoded));

//         // Check if user exists and tokenVersion matches
//         const user = await User.findById(decoded._doc._id);
//         console.log("database user-->", user);
//         if (!user){
//             return res.status(401).json({
//                 success: false,
//                 message: "Unauthorized - Token is no longer valid, please login again",
//             });
//         }
         
//         // Attach user details to request
//             req.user = {id: user._id>toString, role: user.role};

//             next();
//     }
// catch (error){
//     console.error("Authentication Error:", error.message);
//     return res.status(401).json({
// success: false,
// message: "Please authenticate using a valid token",
//     });
// }
// };

// export default authenticate;

import jwt from "jsonwebtoken";
import User from "../models/task.js";
import "dotenv/config";
import chalk from "chalk";

const authenticate = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];   
    }

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized - No token provided" });
    }
    console.log("token -->", token);

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
    console.log(chalk.blue("Decoded Token:", decoded));

    // Fetch the user
    const user = await User.findById(decoded._id);
    console.log("database user -->", user);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Token is no longer valid, please login again",
      });
    }

    // Attach user details to request
    req.user = { id: user._id.toString(), role: user.role };

    next();
  } catch (error) {
    console.error("Authentication Error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Please authenticate using a valid token",
    });
  }
};

export default authenticate;

