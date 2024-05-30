const { Message, User } = require('../db/modelos.js')
const jwt = require("jsonwebtoken");


const crearMensaje = async (req, res) => {
    
 try {
    
    let decodedToken;
    const { content, participantes, token } = req.body
    
    decodedToken = jwt.verify(token, process.env.JWTKEY);
    const remitente = decodedToken.userId
    let erros = ['']

    for (const elemento of participantes) {
        try {
            const user = await User.findOne({ name: elemento });
            if (!user) {
                return res.status(400).json({status: false, message: 'usuario no existe'})
            }
        } catch (error) {
            return res.status(400).json({status: false, message: error.error})
        }
    }
    
    // AQUI VA LA LOGICA DE ERRORES PARA EL RETORNO 
   
    const nuevoMensaje = new Message({
        content: content, 
        remitente: remitente,
        participantes: participantes, 
      });

  await nuevoMensaje.save()
  return res.status(200).json({status: true, message: 'Mensaje enviado'})
     
 } catch (error) {
    return res.status(400).json({status: false, message: error.message})
 }
}

module.exports = crearMensaje