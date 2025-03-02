const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());
let tasks = [];
let taskId = 1;

app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
  const { name, completed } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Task name is required" });
  }
  const newTask = { id: taskId++, name, completed: completed || false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.delete("/api/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }
  tasks.splice(taskIndex, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
/*
1.Addtask- curl -X POST http://localhost:3000/api/tasks -H "Content-Type: application/json" -d '{"name": "Learn Node.js", "completed": false}'

2-DeleteTask-curl -X DELETE http://localhost:3000/api/tasks/1

3-GetAll Task-curl -X GET http://localhost:3000/api/tasks

*/
