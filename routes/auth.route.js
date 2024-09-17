import { Router } from 'express';
import { login, register } from "../controllers/auth.controller.js";

const auth_router = Router()

auth_router.post('/register', register)

auth_router.post('/login', login)


export { auth_router } 