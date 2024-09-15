import fs from 'fs';
import { encryptFile, decryptFile } from '../services/AES/aes.service.js';

// Controlador para cifrar archivos
export const encryptFileController = (req, res) => {
  const file = req.file; // Archivo subido
  const key = req.body.key; // Clave ingresada

  if (!key || key.length !== 32) {
    return res.status(400).send('La clave debe ser de 32 caracteres.');
  }

  try {
    const fileBuffer = fs.readFileSync(file.path);
    const encryptedFile = encryptFile(fileBuffer, key);

    const encryptedFilePath = `encrypted_${file.originalname}`;
    fs.writeFileSync(encryptedFilePath, encryptedFile);

    res.download(encryptedFilePath, encryptedFilePath, (err) => {
      if (err) console.error('Error al enviar el archivo cifrado:', err);
      fs.unlinkSync(file.path);
      fs.unlinkSync(encryptedFilePath);
    });
  } catch (error) {
    res.status(500).send('Error al cifrar el archivo');
  }
};

// Controlador para descifrar archivos
export const decryptFileController = (req, res) => {
  const file = req.file;
  const key = req.body.key;

  if (!key || key.length !== 32) {
    return res.status(400).send('La clave debe ser de 32 caracteres.');
  }

  try {
    const fileBuffer = fs.readFileSync(file.path);
    const decryptedFile = decryptFile(fileBuffer, key);

    const decryptedFilePath = `decrypted_${file.originalname}`;
    fs.writeFileSync(decryptedFilePath, decryptedFile);

    res.download(decryptedFilePath, decryptedFilePath, (err) => {
      if (err) console.error('Error al enviar el archivo descifrado:', err);
      fs.unlinkSync(file.path);
      fs.unlinkSync(decryptedFilePath);
    });
  } catch (error) {
    res.status(500).send('Error al descifrar el archivo');
  }
};
