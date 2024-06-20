"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPost = exports.findOne = exports.findAllCategories = exports.findLast3 = exports.findAll = void 0;
const db_1 = require("../db");
// Get all posts
const findAll = (callback) => {
    const queryString = `SELECT * FROM posts`;
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const posts = [];
        rows.forEach((row) => {
            const post = {
                id: row.id,
                titlu: row.titlu,
                continut: row.continut,
                categorie_id: row.categorie_id,
                user_id: row.user_id,
                dataadaugare: row.dataadaugare,
                poza: row.poza,
            };
            posts.push(post);
        });
        callback(null, posts);
    });
};
exports.findAll = findAll;
// Get all posts
const findLast3 = (callback) => {
    const queryString = `SELECT p.id,p.titlu,p.continut,p.poza, p.user_id,
  p.categorie_id, p.dataadaugare, c.nume 
  FROM posts p INNER JOIN categories c on p.categorie_id= c.id ORDER BY p.id DESC LIMIT 3`;
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const posts = [];
        rows.forEach((row) => {
            const post = {
                id: row.id,
                titlu: row.titlu,
                continut: row.continut,
                categorie_id: row.categorie_id,
                user_id: row.user_id,
                dataadaugare: row.dataadaugare,
                poza: row.poza,
                categorie_nume: row.nume,
            };
            posts.push(post);
        });
        callback(null, posts);
    });
};
exports.findLast3 = findLast3;
const findAllCategories = (callback) => {
    const queryString = `SELECT * FROM categories`;
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const categories = [];
        rows.forEach((row) => {
            const category = {
                id: row.id,
                nume: row.nume,
            };
            categories.push(category);
        });
        callback(null, categories);
    });
};
exports.findAllCategories = findAllCategories;
// Get one user
const findOne = (postId, callback) => {
    const queryString = `SELECT * FROM posts AS p INNER JOIN categories AS c ON p.categorie_id = c.id WHERE p.id=?`;
    db_1.db.query(queryString, postId, (err, result) => {
        if (err) {
            callback(err);
        }
        const row = result[0];
        const post = {
            id: row.id,
            titlu: row.titlu,
            continut: row.continut,
            categorie_id: row.categorie_id,
            user_id: row.user_id,
            dataadaugare: row.dataadaugare,
            poza: row.poza,
            categorie_nume: row.nume,
        };
        callback(null, post);
    });
};
exports.findOne = findOne;
// create post
const addPost = (post, callback) => {
    const queryString = "INSERT INTO posts (titlu, continut, categorie_id, user_id,poza) VALUES (?, ?, ?, ?, ?)";
    console.log(post);
    try {
        let sqldeb = db_1.db.query(queryString, [post.titlu, post.continut, post.categorie_id, post.user_id, post.poza], (err, result) => {
            if (err) {
                callback(err);
            }
            if (result !== undefined) {
                const insertId = result.insertId;
                callback(null, insertId);
            }
            else {
                console.log("error insert");
                callback(null, 0);
            }
        });
        console.log(sqldeb.sql);
    }
    catch (error) {
        callback(error);
    }
};
exports.addPost = addPost;
