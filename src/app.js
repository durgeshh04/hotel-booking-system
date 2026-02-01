import express from "express";
import routes from "./routes.js";
import helmet from "helmet";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

// middlewares
app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: "*",
  }),
);

// routes
app.get("/", (req, res) => {
  res.send("Server is running!");
});
routes(app);

// error handling
app.use(errorHandler);

export default app;
