import { Router } from 'express';
import { login, register } from "../controllers/auth.controller.js";
import rateLimit from 'express-rate-limit';

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 10 requests per windowMs
    message: {
        status: 429,
        message: "Too many requests, please try again later."
    }
})

const auth_router = Router()

auth_router.post('/register', authLimiter, register)

auth_router.post('/login', authLimiter, login)


export { auth_router }
