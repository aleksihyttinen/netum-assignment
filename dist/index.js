"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const db_1 = __importDefault(require("./db"));
const path = require("path");
const cors = require("cors");
app.use(cors());
app.use(express_1.default.static(path.join(__dirname + "/../frontend/build/")));
app.use(express_1.default.json());
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield db_1.default.getUsers();
        res.send(data);
    }
    catch (err) {
        console.log(err);
        res.statusCode = 400;
        res.end();
    }
}));
app.delete("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = parseInt(req.params.id);
    try {
        let result = yield db_1.default.deleteUser(id);
        res.statusCode = 200;
        res.send(result);
        res.end();
    }
    catch (err) {
        console.log(err);
        res.statusCode = 404;
        res.end();
    }
}));
app.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        age: req.body.age,
    };
    console.log(user);
    try {
        let insertId = yield db_1.default.addUser(user);
        res.statusCode = 201;
        res.send(`Added user successfully with a id of ${insertId}`);
    }
    catch (err) {
        console.log(err);
        res.statusCode = 400;
        res.end();
    }
}));
app.put("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = parseInt(req.params.id);
    let user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        age: req.body.age,
    };
    try {
        yield db_1.default.editUser(id, user);
        res.statusCode = 200;
        res.send({
            id: id,
            first_name: user.first_name,
            last_name: user.last_name,
            age: user.age,
        });
        res.end();
    }
    catch (err) {
        console.log(err);
        res.statusCode = 404;
        res.end();
    }
}));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/../frontend/build/index.html"));
});
const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
//# sourceMappingURL=index.js.map