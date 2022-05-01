const connection = require("../database/connection");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../secret/jwtSecret");

const verifyLogin = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      message:
        "Para acessar este recurso um token de autenticação válido deve ser enviado.",
    });
  }
  try {
    const token = authorization.split(" ")[1];
    const { id } = await jwt.verify(token, jwtSecret);
    const user = await connection("users").where({ id });
    if (user.length === 0) {
      return res.status(404).json({ message: "Usuario não encontrado" });
    }
    req.userId = id;
    next();
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = { verifyLogin };
