"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = __importStar(require("mysql2"));
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
            pool.query(`SELECT * FROM users`, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    },
    deleteUser: (id) => {
        return new Promise((resolve, reject) => {
            pool.query(`DELETE FROM users WHERE id = ?`, id, (err, result) => {
                if (err) {
                    reject(err);
                }
                if (result.affectedRows == 0) {
                    reject("Id not found");
                }
                else {
                    resolve(`Deleted id: ${id} successfully`);
                }
            });
        });
    },
    addUser: (user) => {
        return new Promise((resolve, reject) => {
            pool.query(`INSERT INTO users (first_name, last_name, age) VALUES (?,?,?)`, [user.first_name, user.last_name, user.age], (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result.insertId);
            });
        });
    },
    editUser: (id, user) => {
        return new Promise((resolve, reject) => {
            pool.query(`UPDATE users SET first_name = ?, last_name = ?, age = ? WHERE users.id = ${id}`, [user.first_name, user.last_name, user.age], (err, result) => {
                if (err) {
                    reject(err);
                }
                if (result.affectedRows == 0) {
                    reject("Id not found");
                }
                else {
                    resolve(result);
                }
            });
        });
    },
};
exports.default = connectionFunctions;
//# sourceMappingURL=db.js.map