// 🔥🔥🔥🔥🔥🔥🔥 A FUNCIONARRRRR 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

import express from "express";
import dotenv from "dotenv";
import routeRouter from "./src/routes/routeRouter.js";

import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(express.json());


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {

  
  res.send("Route Service is running!");
});


app.use("/route", routeRouter);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Route Service running at http://localhost:${PORT}`);
});

