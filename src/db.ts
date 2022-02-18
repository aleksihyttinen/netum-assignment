import * as mysql from "mysql2";
import { IUser } from "./Interfaces";
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
  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM users`, (err: Error, result: []) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  getUser: (id: number) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM users WHERE id = ?`,
        id,
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
  addUser: (user: IUser) => {
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
  editUser: (id: number, user: IUser) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE users SET first_name = ?, last_name = ?, age = ? WHERE id = ?`,
        [user.first_name, user.last_name, user.age, id],
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
