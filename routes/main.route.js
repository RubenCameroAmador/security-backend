import { Router } from "express";
import { ping } from "../controllers/main.controller.js";

const router = Router();
router.get("/ping", ping);

export default router;
