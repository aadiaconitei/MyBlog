import { Contact } from "./../types/Contact";
import { db } from "../db";
import { RowDataPacket } from "mysql2";
// Get all users
export const findAll = (callback: Function) => {
  const queryString = `SELECT * FROM contact`;
  db.query(queryString, (err, result) => {
    if (err) {
      callback(err);
    }
    const rows = <RowDataPacket[]>result;
    const contact_messages: Contact[] = [];
    rows.forEach((row) => {
      const contact_message: Contact = {
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

export const findOne = (contactId: number, callback: Function) => {
  const queryString = `SELECT * FROM contact WHERE id=?`;
  db.query(queryString, contactId, (err, result) => {
    if (err) {
      callback(err);
    }

    const row = (<RowDataPacket>result)[0];
    const message: Contact = {
      id: row.id,
      nume: row.nume,
      prenume: row.prenume,
      email: row.email,
      mesaj: row.mesaj,
    };
    callback(null, message);
  });
};
