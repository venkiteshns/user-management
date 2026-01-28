import app from "./app.js";
import dbConnect from "./config/dbConfig.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    console.log("Attempting connection with database");
    await dbConnect();
    app.listen(PORT, () => {
      console.log(`Server running on port : http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Error while starting server", error);
    process.exit(1);
  }
};

startServer();
