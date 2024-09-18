// /controllers/downloadUser.controller.js
import fs from 'fs'
import { getAllUsers} from '../services/downloadUser/downloadUser.service.js'

const downloadUsers = async (req, res) => {
  try {
    const users = await getAllUsers();

    // Crear contenido para el archivo .txt
    let fileContent = 'Lista de usuarios:\n';
    users.forEach(user => {
      fileContent += `Name: ${user.name}, LastName: ${user.lastname}, Nickname: ${user.nickname}, Password: ${user.password}\n`;
    });

    const filePath = './usuarios.txt';
    fs.writeFileSync(filePath, fileContent);

    // Enviar el archivo para su descarga
    res.download(filePath, 'usuarios.txt', err => {
      if (err) {
        console.error('Error al enviar el archivo:', err);
        res.status(500).send('Error en el servidor.');
      }

      // Elimina el archivo después de la descarga (opcional)
      fs.unlinkSync(filePath);
    });
  } catch (error) {
    console.error('Error en downloadUsers:', error);
    res.status(500).send('Error en el servidor.');
  }
};

export { downloadUsers }