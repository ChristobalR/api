const {Router} = require('express')
const { crearUsuario, login, validarToken, test} = require('../controllers/aut.js')
const crearMensaje = require('../controllers/messages.js')
const rutas = Router()


rutas.post('/api/crearUsuario',crearUsuario )
rutas.post('/api/login', login)
rutas.get('/api/validarToken', validarToken)
rutas.get('/test', test)
rutas.post('/api/crearMensaje', crearMensaje)

module.exports = rutas