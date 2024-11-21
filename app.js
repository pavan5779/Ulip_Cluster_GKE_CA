const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

require("dotenv").config({
  path: path.join(__dirname, `.env.${process.env.NODE_ENV}`),
});

const port = process.env.PORT || 8000;

const app = express();

app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: [/.[0-9]{4}/],
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "50mb",
    type: ["application/json", "text/plain"],
  })
);
app.use(express.urlencoded({ limit: "50mb", extended: false }));

app.get("/api/healthcheck", async (req, res) => {
  res.json({
    status: "ok",
    message: "Server Running - v0.0.1",
    env: process.env.NODE_ENV,
    uptime: process.uptime(),
    version: process?.env?.CONFIG_VERSION ?? "Not Found",
  });
});

app.use("*", (req, res) => {
  res.status(404).send("Not Found");
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
