const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

if (process.env.ENVIRONMENT !== "PRODUCTION") {
  require("dotenv").config();
}

const taskController = require("./controller/task.controller");

const app = express();
const port = process.env.PORT || 3080;

app.use(cors());
app.use(express.static(path.join(__dirname, "../ui/build")));
app.use(bodyParser.json());

app.get("/api/tasks", (req, res) => {
  taskController.getTasks().then((data) => res.json(data));
});

app.post("/api/task", (req, res) => {
  console.log(req.body);
  taskController.createTask(req.body.task).then((data) => res.json(data));
});

app.put("/api/task", (req, res) => {
  taskController.updateTask(req.body.task).then((data) => res.json(data));
});

app.delete("/api/task/:id", (req, res) => {
  taskController.deleteTask(req.params.id).then((data) => res.json(data));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../ui/build/index.html"));
});
mongoose.connect(process.env.MONGO_CONNECTION_STRING).then((data) => {
  console.log(`MongoDb is connected to host ${data.connection.host}`);
});
app.listen(port, () => {
  console.log(`Server listening on the port  ${port}`);
});
