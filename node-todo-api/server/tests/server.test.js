const expect = require("expect");
const request = require("supertest");
const mongoose = require("mongoose");

const { app } = require("./../server");
const { Todo } = require("./../db/models/todo");

const todos = [
  {
    _id: new mongoose.Types.ObjectId(),
    text: "First test todo",
    completed: false,
    completedAt: 333,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    text: "Second test todo",
  },
];
beforeEach((done) => {
  Todo.deleteMany({})
    .then(() => {
      return Todo.insertMany(todos);
    })
    .then(() => done());
});

describe("POST /todos", () => {
  it("should create a new todo", (done) => {
    var text = "Test todo text";
    request(app)
      .post("/todos")
      .send({ text })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find({ text })
          .then((todos) => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          })
          .catch((e) => done(e));
      });
  });

  it("should not create todo with invalid body data", (done) => {
    request(app)
      .post("/todos")
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find()
          .then((todos) => {
            expect(todos.length).toBe(2);
            done();
          })
          .catch((e) => done(e));
      });
  });
});
describe("GET /todos", () => {
  it("should get all todos", (done) => {
    request(app)
      .get("/todos")
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe("GET /todos/:id", () => {
  it("should return todo doc", (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });
  it("should return 404  todo NOT FOUND", (done) => {
    request(app).get("/todos/sa123").expect(404).end(done);
  });
});
describe("DELETE /todos/:id", () => {
  it("should remove a  todo doc", (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });
  it("should return 404  todo NOT FOUND", (done) => {
    request(app).get("/todos/sa123").expect(404).end(done);
  });
});
describe("PATCH /todos/:id", () => {
  it("should update  a  todo doc", (done) => {
    request(app)
      .patch(`/todos/${todos[0]._id.toHexString()}`)
      .send({ text: "UPdated First TODO", completed: true })
      .expect(200)
      .end((err,res)=>{
        if(err){
          return done(err)
        }
        expect(res.body.text).toBe("UPdated First TODO")
        done()
      });
  });
  it("should return 404  todo NOT FOUND", (done) => {
    request(app).get("/todos/sa123").expect(404).end(done);
  });
});
