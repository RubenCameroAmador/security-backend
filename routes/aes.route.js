import { Router } from 'express';
import { encryptFileController, decryptFileController } from '../controllers/aes.controller.js';
import multer from 'multer';

// Configurar multer para subir archivos a la carpeta 'uploads/'
const upload = multer({ dest: 'uploads/' });

const aes_router = Router();

// Ruta para cifrar archivos
aes_router.post('/encrypt', upload.single('file'), encryptFileController);

// Ruta para descifrar archivos
aes_router.post('/decrypt', upload.single('file'), decryptFileController);

export { aes_router };