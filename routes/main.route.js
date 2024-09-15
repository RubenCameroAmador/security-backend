import { Router } from "express";
import { ping } from "../controllers/main.controller.js";
import {aes_router} from './aes.route.js'

const router = Router();
router.get("/ping", ping);

router.use("/AES", aes_router)

export default router;
