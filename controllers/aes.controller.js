import fs, { stat } from 'fs';
import { encryptFile, decryptFile } from '../services/AES/aes.service.js';
import { constants } from "../services/utils/constants.js"
import { response } from "../services/utils/response.js"

const { status, message } = constants.response

// Controller for encrypting files
export const encryptFileController = (req, res) => {
  const file = req.file; // File uploaded
  const key = req.body.key; // Key entered

  if (!key || key.length > 32) {
    return res.status(status.bad_request).json(response(false, 'The key must be a maximum of 32 characters.', []));
  }

  try {
    const fileBuffer = fs.readFileSync(file.path);
    const encryptedFile = encryptFile(fileBuffer, key);

    const encryptedFilePath = `encrypted_${file.originalname}`;
    fs.writeFileSync(encryptedFilePath, encryptedFile);

    res.download(encryptedFilePath, encryptedFilePath, (err) => {
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
    const fileBuffer = fs.readFileSync(file.path);
    const decryptedFile = decryptFile(fileBuffer, key);

    const decryptedFilePath = `decrypted_${file.originalname}`;
    fs.writeFileSync(decryptedFilePath, decryptedFile);

    res.download(decryptedFilePath, decryptedFilePath, (err) => {
      if (err) console.error('Error sending the decrypted file:', err);
      fs.unlinkSync(file.path);
      fs.unlinkSync(decryptedFilePath);
    });
  } catch (error) {
    res.status(status.server_error).json(response(false, 'Error decrypting the file; the key might be different.', []));
  }
};
