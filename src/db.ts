import * as mysql from "mysql2";
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
interface User {
  first_name: string;
  last_name: string;
  age: number;
}
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
  deleteUser: (id: number) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `DELETE FROM users WHERE id = ?`,
        id,
        (err: Error, result: mysql.OkPacket) => {
          if (err) {
            reject(err);
          }
          if (result.affectedRows == 0) {
            reject("Id not found");
          } else {
            resolve(`Deleted id: ${id} successfully`);
          }
        }
      );
    });
  },
  addUser: (user: User) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO users (first_name, last_name, age) VALUES (?,?,?)`,
        [user.first_name, user.last_name, user.age],
        (err: Error, result: mysql.OkPacket) => {
          if (err) {
            reject(err);
          }
          resolve(result.insertId);
        }
      );
    });
  },
  editUser: (id: number, user: User) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE users SET first_name = ?, last_name = ?, age = ? WHERE users.id = ${id}`,
        [user.first_name, user.last_name, user.age],
        (err: Error, result: mysql.OkPacket) => {
          if (err) {
            reject(err);
          }
          if (result.affectedRows == 0) {
            reject("Id not found");
          } else {
            resolve(result);
          }
        }
      );
    });
  },
};
export default connectionFunctions;
