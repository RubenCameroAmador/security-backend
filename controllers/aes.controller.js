import fs from 'fs'
import path from 'path'
import { encryptFile, decryptFile } from '../services/AES/aes.service.js'
import { constants } from "../services/utils/constants.js"
import { response } from "../services/utils/response.js"
import sanitize from 'sanitize-filename'

const { status, message } = constants.response
const uploadDirectory = path.resolve('uploads')

// Controller for encrypting files
export const encryptFileController = (req, res) => {
  const file = req.file; // File uploaded
  const key = req.body.key; // Key entered

  if (!key || key.length > 32) {
    return res.status(status.bad_request).json(response(false, 'The key must be a maximum of 32 characters.', []));
  }

  try {
    const safeFileName = sanitize(file.originalname);

    const filePath = path.join(uploadDirectory, safeFileName);
    const fileBuffer = fs.readFileSync(file.path);

    const encryptedFile = encryptFile(fileBuffer, key);

    const encryptedFilePath = path.join(uploadDirectory, `encrypted_${safeFileName}`);
    fs.writeFileSync(encryptedFilePath, encryptedFile);

    res.download(encryptedFilePath, safeFileName, (err) => {
      if (err) console.error('Error sending the encrypted file:', err);

      fs.unlinkSync(file.path);
      fs.unlinkSync(encryptedFilePath);
    });
  } catch (error) {
    res.status(status.server_error).json(response(false, 'Error encrypting the file', []));
  }
};

// Controller for decrypting files
export const decryptFileController = (req, res) => {
  const file = req.file;
  const key = req.body.key;

  if (!key || key.length > 32) {
    return res.status(status.bad_request).json(response(false, 'The key must be a maximum of 32 characters.', []));
  }

  try {
    const safeFileName = sanitize(file.originalname);

    const filePath = path.join(uploadDirectory, safeFileName);
    const fileBuffer = fs.readFileSync(file.path);

    const decryptedFile = decryptFile(fileBuffer, key);

    const decryptedFilePath = path.join(uploadDirectory, `decrypted_${safeFileName}`);
    fs.writeFileSync(decryptedFilePath, decryptedFile);

    res.download(decryptedFilePath, safeFileName, (err) => {
      if (err) console.error('Error sending the decrypted file:', err);

      fs.unlinkSync(file.path);
      fs.unlinkSync(decryptedFilePath);
    });
  } catch (error) {
    res.status(status.server_error).json(response(false, 'Error decrypting the file; the key might be different.', []));
  }
};
