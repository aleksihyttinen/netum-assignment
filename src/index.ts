import express from "express";
import connection from "./db";
import { IUser } from "./Interfaces";
const app = express();
const path = require("path");
const cors = require("cors");

//Middlewares used for the app
app.use(cors()); //Handles cors policy
app.use(express.static(path.join(__dirname + "/../frontend/build/"))); //Deploys frontend
app.use(express.json()); //Parses request bodies as json

//Get all
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
//Get by id
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
//Delete by id
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
//Post a new user
app.post("/users", async (req: express.Request, res: express.Response) => {
  let user: IUser = {
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
//Update a user by id
app.put("/users/:id", async (req: express.Request, res: express.Response) => {
  let id = parseInt(req.params.id);
  let user: IUser = {
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

//If request is anythin else than the ones defined, send frontend html page
app.get("*", (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(__dirname + "/../frontend/build/index.html"));
});

//Start the server
const port: string | number = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
