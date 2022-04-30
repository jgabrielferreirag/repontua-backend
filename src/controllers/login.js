const connection = require("../database/connection");
const securePassword = require("secure-password");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../secret/jwtSecret.js");
const { validateRequireds } = require("../validations/validations");

const pwd = securePassword();

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
    return res.status(500).json({ mensagem: "Erro desconhecido" + error });
  }
};
module.exports = {
  signInUser,
};
