const mongoose = require('mongoose');
const dotenv = require('dotenv');

async function connectToDatabase() {
    try {
        const mongodb = process.env.MONGODB
        await mongoose.connect(mongodb);
        console.log('Conexión establecida a la base de datos');
    } catch (error) {
        console.error('No se ha podido establecer conexión a la base de datos', error);
    }
}






module.exports = connectToDatabase;