import { Router } from "express";
import { downloadUsers } from "../controllers/downloadUser.controller.js";

const downloadUser_router = Router();

downloadUser_router.get('/', downloadUsers);

export { downloadUser_router }