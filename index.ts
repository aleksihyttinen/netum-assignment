import express from "express";
const app = express();
import connection from "./db";

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
const port: string | number = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
