// Import necessary modules
import express from "express";
import authRouter from "./routes/auth.router.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import cors from "cors";
import logger from "./config/logger.config.js";
import { serverError } from "./services/response.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

// Initialize the app
const app = express();
app.set("trust proxy", 1);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 500, // Limit each IP to 500 requests per window
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// Register routes
app.use("/", authRouter);
app.use(helmet());

// Start the server
const PORT = process.env.PORT;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

// Swagger options
const swaggerOptions = {
  definition: {
    openapi: "3.0.0", // Specify the OpenAPI version
    info: {
      title: "Express API",
      version: "1.0.0",
      description: "A simple API using Express and Swagger",
    },
  },
  // Path to the API docs
  apis: ["./src/Routes/*.js"], // Point to the folder where your routes are defined
};

// Generate Swagger specification
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve Swagger UI at /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception: ", err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason) => {
  logger.error("Unhandled Rejection: ", reason);
  process.exit(1);
});

if (process.env.APP_ENV == "production") {
  app.use((err, req, res) => {
    logger.error("Unhandled Error: ", err);
    return serverError(res, "Server Error.");
  });
}
