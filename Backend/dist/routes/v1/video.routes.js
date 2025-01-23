"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const video_controller_1 = require("../../controllers/video.controller");
const multer_moddleware_1 = __importDefault(require("../../middlewares/multer.moddleware"));
const videoRouter = express_1.default.Router();
videoRouter.post('/upload', multer_moddleware_1.default.single('video'), video_controller_1.uploadVideoController);
exports.default = videoRouter;
