const { Router } = require('express');
const getUser = require('../controllers/userInfo.js')
const crearNoticia = require('../controllers/noticias.js')
const rutas = Router();

rutas.get('/api/test', getUser);
rutas.post('/api/crearnoticia', crearNoticia)
rutas.get('/', (req, res) => {
    res.send('No hay nada por aquí :C');
});

module.exports = rutas;