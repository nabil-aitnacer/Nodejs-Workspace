const { app } = require("../server");
const { Todo } = require("../db/models/todo");

const request = require("supertest");
const expect = require("expect");

//use describe to group all of the routes

describe("POST /todos", () => {
  it("it should create new todo", (done) => {
    var text = " text todo test";

    request(app)
    .post('/todos')
    .send({text})
  });
});
