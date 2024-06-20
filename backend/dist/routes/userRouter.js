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
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const userModel = __importStar(require("../models/user"));
const express_validator_1 = require("express-validator");
const jwt_1 = require("../jwt");
const jwt_2 = require("../jwt");
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
var jsonParser = bodyParser.json();
userRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, jwt_2.verifyToken)(req, res)) {
        return res.status(403).json({
            message: "<b>Trebue sa fi logat pentru a accesa aceasta zona!<b>",
        });
    }
    userModel.findAll((err, users) => {
        if (err) {
            return res.status(500).json({ errorMessage: err.message });
        }
        res.status(200).json({ data: users });
    });
}));
userRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, jwt_2.verifyToken)(req, res)) {
        return res.status(403).json({
            message: "<b>Trebue sa fi logat pentru a accesa aceasta zona!<b>",
        });
    }
    const userId = Number(req.params.id);
    userModel.findOne(userId, (err, user) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json({ data: user });
    });
}));
userRouter.post("/", jsonParser, [
    (0, express_validator_1.check)("nume", "Name is requied").not().isEmpty(),
    (0, express_validator_1.check)("prenume", "Name is requied").not().isEmpty(),
    (0, express_validator_1.check)("email", "Please include a valid email")
        .isEmail()
        .normalizeEmail({ gmail_remove_dots: true }),
    (0, express_validator_1.check)("parola", "Password must be 8 or more characters").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, "i"),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const errors = (0, express_validator_1.validationResult)(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }
    const newUser = req.body;
    userModel.create(newUser, (err, userId) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res
            .status(200)
            .json({ message: "Utilizatorul a fost adaugat cu succes!" });
    });
}));
// Edit user
userRouter.put("/:id", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, jwt_2.verifyToken)(req, res)) {
        return res.status(403).json({
            message: "<b>Trebue sa fi logat pentru a accesa aceasta zona!<b>",
        });
    }
    const user = req.body;
    console.log(req.body);
    userModel.update(user, (err) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        // res.status(200).send();
        res.status(200).json({
            message: "success",
        });
    });
}));
// Delete user
userRouter.delete("/:id", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, jwt_2.verifyToken)(req, res)) {
        return res.status(403).json({
            message: "<b>Trebue sa fi logat pentru a accesa aceasta zona!<b>",
        });
    }
    const userId = Number(req.params.id);
    console.log(userId);
    userModel.deleteUser(userId, (err) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        // res.status(200).send();
        res.status(200).json({
            message: "success",
        });
    });
}));
userRouter.post("/veifyLogin", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const loginUser = req.body;
    userModel.veifyPassword(loginUser, (err, user) => {
        if (err) {
            return res.status(401).send({
                accessToken: null,
                message: err.message,
            });
            //return res.status(500).json({"message": err.message});
        }
        var token = (0, jwt_1.generateToken)();
        console.log("JWT", token);
        //res.status(200).json({"message": 'success'});
        res.status(200).send({
            id: user.id,
            nume: user.nume,
            prenume: user.prenume,
            email: user.email,
            roles: "ADMIN",
            accessToken: token,
        });
    });
}));
userRouter.post("/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).json({
        accessToken: null,
        message: "User has been logged out.",
    });
}));
