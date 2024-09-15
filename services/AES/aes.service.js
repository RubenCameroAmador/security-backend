import crypto from 'crypto';

// Función para cifrar un archivo
export const encryptFile = (buffer, key) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
  return Buffer.concat([iv, encrypted]); // El IV se guarda con el archivo cifrado
};

// Función para descifrar un archivo
export const decryptFile = (buffer, key) => {
  const iv = buffer.slice(0, 16); // El IV está en los primeros 16 bytes
  const encryptedText = buffer.slice(16);
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
  const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
  return decrypted;
};
