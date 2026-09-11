import app from "./app.js";
import { env } from "./config/env.js";
import connectDB from "./database/connectDB.js";
import { User, Project, Task } from "./models/index.js";

const startServer = async () => {
  try {
    await connectDB();

    app.listen(env.port, () => {
      console.log(`NOVA API running on port ${env.port}`);
      console.log(`Environment: ${env.nodeEnv}`);
    });
  } catch (error) {
    console.error(`Server startup failed: ${error.message}`);
    process.exit(1);
  }
};


startServer();