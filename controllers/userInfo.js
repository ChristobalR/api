const mongoose = require("mongoose");
const { User } = require("../db/modelos.js");
const jwt = require("jsonwebtoken");



const getUser = async (req, res) => {
  const clave = process.env.JWTKEY;
  try {
    // Obtener el token del encabezado de autorización
    const token = req.headers.token;
 
    if (!token) {
      return res.status(401).json({ error: "Token no proporcionado" });
    }

    let decodedToken;
    try {
      // Verificar el token utilizando la clave
      decodedToken = jwt.verify(token, clave);
    } catch (error) {
      console.error("Error al verificar el token:", error.message);
      return res.status(401).json({ error: "Token inválido" });
    }

    const usuarioId = decodedToken.userId;

    const usuarioEncontrado = await User.findById(usuarioId);
     const userJson = {
      user: usuarioEncontrado.name,

     }
    if (usuarioEncontrado) {
      const data = {
        usuario: userJson.user,
        date: new Date(),
      };
      return res.json(data);
    } else {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error en la solicitud:", error.message);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = getUser;