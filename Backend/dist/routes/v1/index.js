"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const video_routes_1 = __importDefault(require("./video.routes"));
const v1Router = express_1.default.Router();
v1Router.use('/videos', video_routes_1.default); //redirect to videoRotes
v1Router.get('/ping', (_req, res) => {
    res.json({
        message: 'pong!!!'
    });
});
exports.default = v1Router;
