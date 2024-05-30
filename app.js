////////////////////// DEPENDENCIAS ////////////////////
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv');
const morgan = require('morgan')
//////////////// IMPORTS /////////////////
const connectToDatabase = require("./db/conexion.js");
const autRoutes = require("./routes/aut.routes.js");
const rutasTest = require("./routes/test.routes.js");

////////////////// CODIGO /////////////////


dotenv.config();


const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(morgan('dev'))
app.use(cookieParser());

const PORT = process.env.PORT

connectToDatabase();

app.use(bodyParser.json());
app.use(autRoutes);
app.use(rutasTest);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
