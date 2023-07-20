const { mongoose } = require("./db/mongoose");
const { Todo } = require("./db/models/todo");
const { User } = require("./db/models/user");
const express = require("express");
const body_parser = require("body-parser");
const { ObjectID } = require("mongodb");
const app = express();
const port = process.env.PORT || 3000;
const _ = require("loadsh");

app.use(body_parser.json());

app.listen(port, () => {
  console.log(`Server Lesteninng on port ${port}`);
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
//GET by Id
app.get("/todos/:id", (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).send("Id not Valid");
  }
  Todo.findById(req.params.id).then(
    (todo) => {
      if (todo) {
        res.send({ todo });
      } else {
        res.status(404).send({
          todo: `No todo found for this id ${req.params.id}`,
        });
      }
    },
    (e) => res.status(400).send(e)
  );
});
app.delete("/todos/:id", (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).send("Id not Valid");
  }
  Todo.findOneAndDelete({ _id: req.params.id }).then(
    (todo) => {
      if (todo) {
        res.send({ todo });
      } else {
        res.status(404).send({
          todo: `No todo found for this id ${req.params.id}`,
        });
      }
    },
    (e) => res.status(400).send(e)
  );
});
app.patch("/todos/:id", (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ["text", "completed"]);
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).send("Id not Valid");
  }

  console.log(body);
  Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then(
    (todo) => {
      if (todo) {
        res.send({ todo });
      } else {
        res.status(404).send({
          todo: `No todo found for this id ${req.params.id}`,
        });
      }
    },
    (e) => res.status(400).send(e)
  ).catch((e) => {
    res.status(400).send();
 });
});
module.exports = { app };
