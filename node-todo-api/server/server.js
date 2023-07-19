const { mongoose } = require("./db/mongoose");
const { Todo } = require("./db/models/todo");
const { User } = require("./db/models/user");
const express = require("express");
const body_parser = require("body-parser");

const app = express();
app.use(body_parser.json());

app.listen(3000, () => {
  console.log("Server Lesteninng on port 3000");
});

app.post("/todos", (req, res) => {
  const newTodo = new Todo({
    text: req.body.text,
    completed: req.body.completed,
    completedAt: req.body.completedAt,
  });
  newTodo.save().then(
    (doc) => {
      res.send(doc);
    },
    (e) => {
      res.status(400).send(e);
    }
  );
});
app.get("/todos", async (req, res) => {
  Todo.find({}).then(
    (todos) => {
      res.send({ todos });
    },
    (e) => res.status(400).send(e)
  );
});
module.exports = { app };
