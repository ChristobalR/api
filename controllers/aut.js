const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");


const { User } = require("../db/modelos.js");

const validacion = async (name, password) => {
  var errors = [];
  const usuario = await User.findOne({ name });
  console.log(usuario)
  if(usuario !== null){
    errors.push('el usuario existe')
  }

  if (name == undefined || name.trim() == "") {
    errors.push("el nombre no puede estar vacio");
  }
  if (password == undefined || password.trim() == "" || password.length < 8) {
    errors.push(
      "la contraseña no puede estar vacia y debe tener mas de 8 caracteres"
    );
  }
  return errors;
};

const crearUsuario = async (req, res) => {
  try {
    const { name, password } = req.body;
    console.log
    var validar =  await validacion(name, password);
    if (validar == "") {
      let pass = await bcryptjs.hash(password, 8);
      const newUser = new User({
        name: name,
        password: pass,
      });
      await newUser.save();
      return res.status(200).json({ status: true, message: "Usuario creado" });
    } else {
      return res.status(400).json({ status: false, message: validar });
    }
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

const validarUsuario = async (name, password) => {
  try {
    const user = await User.findOne({ name });
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const passwordMatch = await bcryptjs.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Contraseña incorrecta");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWTKEY, {
      expiresIn: "1h",
    });

    return { token };
  } catch (error) {
    throw new Error(error.message);
  }
};

const login = async (req, res) => {
  const { name, password } = req.body;

  try {
    const { token } = await validarUsuario(name, password);

    res.cookie("jwt", token);
    res.status(200).json({ status: true, message: "hola mundo" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const validarToken = async (req, res) => {
  const clave = process.env.JWTKEY;
  
  const token = req.headers["token"];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, clave);
  } catch (error) {
    console.error("Error al verificar el token:", error.message);
    return res.status(401).json({ error: "Token inválido", message: 'token invalido'});
  }
  return res.status(200).json({ message: true });
};

const test = async (req, res) => {

  return res.status(200).json({test: 'test'})
}


module.exports = { crearUsuario, login, validarToken, test };
