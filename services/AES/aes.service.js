import crypto from 'crypto';

const getKey = (key) => {
    return Buffer.from(key.padEnd(32, ' ')).slice(0, 32);
  };  

// Function to encrypt a file
export const encryptFile = (buffer, key) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', getKey(key), iv);
  const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
  return Buffer.concat([iv, encrypted]);
};

// Function to decrypt a file
export const decryptFile = (buffer, key) => {
  const iv = buffer.slice(0, 16);
  const encryptedText = buffer.slice(16);
  const decipher = crypto.createDecipheriv('aes-256-cbc', getKey(key), iv);
  const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
  return decrypted;
};
