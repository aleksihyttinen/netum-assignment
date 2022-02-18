import express from "express";
const app = express();
import connection from "./db";
const path = require("path");
const cors = require("cors");
interface User {
  first_name: string;
  last_name: string;
  age: number;
}
app.use(cors());
app.use(express.static(path.join(__dirname + "/../frontend/build/")));
app.use(express.json());

app.get("/users", async (req: express.Request, res: express.Response) => {
  try {
    let data = await connection.getAllUsers();
    res.send(data);
  } catch (err) {
    console.log(err);
    res.statusCode = 400;
    res.end();
  }
});
app.get("/users/:id", async (req: express.Request, res: express.Response) => {
  let id = parseInt(req.params.id);
  try {
    let data = await connection.getUser(id);
    res.send(data);
  } catch (err) {
    console.log(err);
    res.statusCode = 400;
    res.end();
  }
});
app.delete(
  "/users/:id",
  async (req: express.Request, res: express.Response) => {
    let id = parseInt(req.params.id);
    try {
      let result = await connection.deleteUser(id);
      res.statusCode = 200;
      res.send(result);
      res.end();
    } catch (err) {
      console.log(err);
      res.statusCode = 404;
      res.end();
    }
  }
);
app.post("/users", async (req: express.Request, res: express.Response) => {
  let user: User = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    age: req.body.age,
  };
  console.log(user);
  try {
    let insertId = await connection.addUser(user);
    res.statusCode = 201;
    res.send(`Added user successfully with a id of ${insertId}`);
  } catch (err) {
    console.log(err);
    res.statusCode = 400;
    res.end();
  }
});
app.put("/users/:id", async (req: express.Request, res: express.Response) => {
  let id = parseInt(req.params.id);
  let user: User = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    age: req.body.age,
  };
  try {
    await connection.editUser(id, user);
    res.statusCode = 200;
    res.send({
      id: id,
      first_name: user.first_name,
      last_name: user.last_name,
      age: user.age,
    });
    res.end();
  } catch (err) {
    console.log(err);
    res.statusCode = 404;
    res.end();
  }
});
app.get("*", (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(__dirname + "/../frontend/build/index.html"));
});
const port: string | number = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
