import { Router } from 'express';
import { encryptFileController, decryptFileController } from '../controllers/aes.controller.js';
import multer from 'multer';
import rateLimit from 'express-rate-limit';
import { valid_token } from '../services/middleware/valid_token.js';

// Configurar multer para subir archivos a la carpeta 'uploads/'
const upload = multer({ dest: 'uploads/' });

const aesLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 10 requests per windowMs
    message: {
        status: 429,
        message: "Too many requests, please try again later."
    }
})

const aes_router = Router();

// Ruta para cifrar archivos
aes_router.post('/encrypt', valid_token, aesLimiter, upload.single('file'), encryptFileController);

// Ruta para descifrar archivos
aes_router.post('/decrypt', valid_token, aesLimiter, upload.single('file'), decryptFileController);

export { aes_router };