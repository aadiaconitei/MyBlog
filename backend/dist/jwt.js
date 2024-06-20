"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
/**
 * generates JWT used for local testing
 */
function generateToken() {
    // information to be encoded in the JWT
    const payload = {
        name: "ReactBlog",
        accessTypes: ["getPosts", "addPost", "updatePost", "deletePost"],
    };
    const signInOptions = {
        algorithm: "HS256",
        expiresIn: "1h",
    };
    // generate JWT
    const key = process.env.SECRET_KEY;
    return (0, jsonwebtoken_1.sign)(payload, key, signInOptions);
}
exports.generateToken = generateToken;
function verifyToken(req, res) {
    let token = req.headers["x-access-token"];
    console.log("token", token);
    if (!token) {
        return false;
        // return res.status(403).send({
        //   message: "No token provided!"
        // });
    }
    let key = process.env.SECRET_KEY;
    jsonwebtoken_1.default.verify(token, key, (err, decoded) => {
        if (err) {
            return false;
            // return res.status(401).send({
            //   message: "Unauthorized!"
            // });
        }
        //req.admin = decoded.admin;
        console.log("decoded", decoded);
    });
    return true;
}
exports.verifyToken = verifyToken;
