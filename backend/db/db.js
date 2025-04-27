import mongoose from "mongoose";
import "dotenv/config";
import chalk from "chalk";

const url = process.env.MONGODB_URL;
const dbName = process.env.DB_NAME;

const connectToDb = async () => {
  if (!url || !dbName) {
    console.log(chalk.bgRed.white("❌ Missing MongoDB URL or DB name in .env"));
    return;
  }

  try {
    await mongoose.connect(url, { dbName });
    console.log(chalk.bgGreen.white("✅ MongoDB connected successfully"));
  } catch (error) {
    console.log(chalk.bgRed.white("❌ Error in connecting to DB:"), error);
  }
};

export default connectToDb;
  

console.log("MongoDB URL:", process.env.MONGODB_URL);

