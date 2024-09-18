import { Router } from "express";
import { downloadUsers } from "../controllers/downloadUser.controller.js";
import rateLimit from 'express-rate-limit';
import { valid_token } from '../services/middleware/valid_token.js';

const downloadUser_router = Router();

const downloadLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 10 requests per windowMs
    message: {
        status: 429,
        message: "Too many requests, please try again later."
    }
})

downloadUser_router.get('/', valid_token, downloadLimiter, downloadUsers);

export { downloadUser_router }