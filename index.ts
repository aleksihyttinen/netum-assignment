import express from "express";
const app = express();
import connection from "./db";

interface User {
  id: number;
  first_name: string;
  last_name: number;
  age: number;
}

app.get("/users", async (req: express.Request, res: express.Response) => {
  try {
    let data = await connection.getUsers();
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
      if (err == "Id not found") {
        res.statusCode = 404;
        res.end();
      }
    }
  }
);
const port: string | number = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
