const mongoose = require("mongoose");
const { Notice } = require("../db/modelos.js");

const crearNoticia = async (req, res) => {
  try { 
 const { tittle , content} = req.body
    const nuevaNoticia = new Notice({
        tittle: tittle,
        content: content
    })
    await nuevaNoticia.save()
    return res.status(200).json({ state: 'true', message: 'Noticia Almacenada'})
  } catch (error) {
    return res.status(400).json({ state: 'false', message: error})
  }
}


module.exports = crearNoticia