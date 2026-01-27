import express from "express";
import { configDotenv } from "dotenv";
configDotenv({ quiet: true });

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World...");
});

app.listen(PORT, () => {
  console.log(`Application is running on http://localhost:${PORT}`);
});
