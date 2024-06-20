"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.veifyPassword = exports.deleteUser = exports.update = exports.create = exports.findOne = exports.findAll = void 0;
const db_1 = require("../db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Get all users
const findAll = (callback) => {
    const queryString = `SELECT * FROM users`;
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const users = [];
        rows.forEach((row) => {
            const user = {
                id: row.id,
                nume: row.nume,
                prenume: row.prenume,
                email: row.email,
                parola: row.parola,
            };
            users.push(user);
        });
        callback(null, users);
    });
};
exports.findAll = findAll;
// Get one user
const findOne = (userId, callback) => {
    const queryString = `SELECT * FROM users WHERE id=?`;
    db_1.db.query(queryString, userId, (err, result) => {
        if (err) {
            callback(err);
        }
        const row = result[0];
        const user = {
            id: row.id,
            nume: row.nume,
            prenume: row.prenume,
            email: row.email,
            parola: row.parola,
        };
        callback(null, user);
    });
};
exports.findOne = findOne;
// create user
const create = (user, callback) => {
    //Verificam daca exista user cu aceasta adresa de email
    const sql = "SELECT * FROM users WHERE email = ?";
    db_1.db.query(sql, [user.email], (err, result) => {
        const row = result[0];
        if (row !== null && row !== undefined) {
            callback("User already exists!." + (err === null || err === void 0 ? void 0 : err.message));
        }
        else {
            const queryString = "INSERT INTO users (nume, prenume, email, parola) VALUES (?, ?, ?, ?)";
            console.log("insert", user);
            let saltRounds = bcryptjs_1.default.genSaltSync(10);
            let password_hash = bcryptjs_1.default.hashSync(user.parola, saltRounds);
            try {
                db_1.db.query(queryString, [user.nume, user.prenume, user.email, password_hash], (err, result) => {
                    if (result !== undefined) {
                        const insertId = result.insertId;
                        callback(null, insertId);
                    }
                    else {
                        console.log("error email", err);
                        //callback(err, 0);
                    }
                });
            }
            catch (error) {
                callback(error);
            }
        }
    });
};
exports.create = create;
// update user
const update = (user, callback) => {
    const queryString = `UPDATE users SET nume=?, prenume=? WHERE id=?`;
    db_1.db.query(queryString, [user.nume, user.prenume, user.id], (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null);
    });
};
exports.update = update;
// delete user
const deleteUser = (user, callback) => {
    console.log(user);
    const queryString = `DELETE FROM users WHERE id=?`;
    db_1.db.query(queryString, [user], (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null);
    });
};
exports.deleteUser = deleteUser;
//login  example
const veifyPassword = (user, callback) => {
    const queryString = `SELECT id, nume, prenume, email, parola from users where email=? LIMIT 1;`;
    const passwordUser = user.parola;
    db_1.db.query(queryString, [user.email], (err, result) => {
        if (err) {
            callback(err);
        }
        if (result.length == 1) {
            const row = result[0];
            var password_hash = row.parola;
            const verified = bcryptjs_1.default.compareSync(passwordUser, password_hash);
            if (verified) {
                const user = {
                    id: row.id,
                    nume: row.nume,
                    prenume: row.prenume,
                    email: row.email,
                    parola: row.parola,
                };
                callback(null, user);
            }
            else {
                console.log("Password doesn't match!");
                callback("Invalid Password!" + (err === null || err === void 0 ? void 0 : err.message));
            }
        }
        else {
            callback("User Not found." + (err === null || err === void 0 ? void 0 : err.message));
        }
    });
};
exports.veifyPassword = veifyPassword;
