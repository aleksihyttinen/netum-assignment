import mysql from "mysql2";
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const connectionFunctions = {
  getUsers: () => {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM users`, (err: Error, result: []) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
};
export default connectionFunctions;
