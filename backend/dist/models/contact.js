"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAll = void 0;
const db_1 = require("../db");
// Get all users
const findAll = (callback) => {
    const queryString = `SELECT * FROM contact`;
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const contact_messages = [];
        rows.forEach((row) => {
            const contact_message = {
                id: row.id,
                nume: row.nume,
                prenume: row.prenume,
                email: row.email,
                mesaj: row.mesaj,
            };
            contact_messages.push(contact_message);
        });
        callback(null, contact_messages);
    });
};
exports.findAll = findAll;
