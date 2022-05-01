const connection = require("../database/connection");
const securePassword = require("secure-password");
const {
  validateRequireds,
  validateAlreadyRegistered,
} = require("../validations/validations");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../secret/jwtSecret.js");

const pwd = securePassword();

const registerUser = async (req, res) => {
  const requiredError = validateRequireds(req);
  if (requiredError) {
    return res.status(401).json({ mensagem: requiredError });
  }

  const { name, email, password, cpf } = req.body;

  try {
    const paramsObject = { cpf, email };
    const databaseError = await validateAlreadyRegistered(
      connection,
      paramsObject
    );

    if (databaseError) {
      return res.status(401).json({ mensagem: databaseError });
    }
    const hash = (await pwd.hash(Buffer.from(password))).toString("hex");
    const registeredUser = await connection("users")
      .insert({
        name,
        email,
        password: hash,
        cpf,
      })
      .returning("*");

    const userId = registeredUser[0].id;
    const userPoints = await connection("user_points").insert({
      amount: 200,
      user_id: userId,
    });

    return res.status(200).json("Usuario cadastrado com sucesso");
  } catch (error) {
    return res.json(error.message);
  }
};

const editUser = async (req, res) => {
  const requiresError = validateRequireds(req);
  if (requiresError) {
    return res.status(401).json({ mensagem: requiresError });
  }

  const { userId } = req;
  const { name, email, password } = req.body;

  try {
    const hash = (await pwd.hash(Buffer.from(password))).toString("hex");
    const editedUser = await connection("users")
      .update({
        name,
        email,
        password: hash,
      })
      .where({ id: userId });
    return res.status(200).json({ message: "Usuario atualizado com sucesso" });
  } catch (error) {
    return res.json(error.message);
  }
};

const signInUser = async (req, res) => {
  const requiresError = validateRequireds(req);

  if (requiresError) {
    return res.status(401).json({ mensagem: requiresError });
  }

  const { email, password } = req.body;

  try {
    const existsEmail = await connection("users").where({ email }).first();

    if (!existsEmail) {
      return res
        .status(401)
        .json({ mensagem: "Usuário e/ou senha inválido(s)." });
    }

    const user = existsEmail;
    const verify = await pwd.verify(
      Buffer.from(password),
      Buffer.from(user.password, "hex")
    );

    switch (verify) {
      case securePassword.INVALID_UNRECOGNIZED_HASH:
      case securePassword.INVALID:
        return res.status(401).json("Usuário e/ou senha inválido(s).");
      case securePassword.VALID:
        break;
      case securePassword.VALID_NEEDS_REHASH:
        try {
          const newHash = (await pwd.hash(Buffer.from(password))).toString(
            "hex"
          );
          await connection("users").update(
            { password: newHash }.where({ email: user.email })
          );
        } catch {}
        break;
    }

    const userInfo = { id: user.id, nome: user.nome, email: user.email };
    const token = jwt.sign(userInfo, jwtSecret, { expiresIn: "1h" });

    return res.status(200).json({ usuario: userInfo, token: token });
  } catch (error) {
    return res.json(error.message);
  }
};

module.exports = {
  registerUser,
  editUser,
  signInUser,
};
