import { Router } from "express";
import { ping } from "../controllers/main.controller.js";
import { aes_router } from './aes.route.js'
import { auth_router } from './auth.route.js';
import { downloadUser_router } from './downloadUser.route.js';

const router = Router();
router.get("/ping", ping);

router.use("/auth", auth_router);
router.use("/AES", aes_router);
router.use("/download", downloadUser_router);
export default router;
