const connection = require("../database/connection");
const securePassword = require("secure-password");
const {
  validateRequireds,
  validateAlreadyRegistered,
} = require("../validations/validations");
const nodemailer = require("../nodemailer");

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
      amount: 0,
      user_id: userId,
    });

    /* await nodemailer.sendMail({
      from: '"Repontua" <nao-responder@jgabrielf.com.br>',
      to: email,
      subject: "Cadastro efetuado com sucesso",
      text: "Agradacemos por se cadastar em nossa aplicação. Comece já a acumular pontos para trocar por recompensas",
    });
 */
    return res.status(200).json("Usuario cadastrado com sucesso");
  } catch (error) {
    return res.json(error.message);
  }
};

/* const editUser = async (req, res) => {
  const requiresError = validateRequireds(req);
  if (requiresError) {
    return res.status(401).json({ mensagem: requiresError });
  }
};
 */
module.exports = {
  registerUser,
  /* editUser, */
};
