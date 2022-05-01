const validateRequireds = (req) => {
  const { url, method } = req;

  if (url === "/usuarios" && method === "PUT") {
    const { name, email, password } = req.body;

    if (!name) {
      return "O nome é obrigatório";
    }

    if (!email) {
      return "O email é obrigatório";
    }

    if (!password) {
      return "A senha é obrigatória";
    }
    return;
  }

  if (url === "/usuarios") {
    const { name, email, password, cpf } = req.body;

    if (!name) {
      return "O nome é obrigatório";
    }

    if (!email) {
      return "O email é obrigatório";
    }

    if (!password) {
      return "A senha é obrigatória";
    }

    if (!cpf) {
      return "O CPF é obrigatório";
    }
  }

  if (url === "/login") {
    const { email, password } = req.body;
    if (!email) {
      return "O email é obrigatório";
    }

    if (!password) {
      return "A senha é obrigatória";
    }
  }

  if (url.includes("/enderecos")) {
    const { name, cep, address } = req.body;
    if (!name) {
      return "O nome do local é obrigatório";
    }

    if (!cep) {
      return "O CEP é obrigatório";
    }

    if (!address) {
      return "O endereço é obrigatório";
    }
  }
};

const validateAlreadyRegistered = async (connection, paramsObject) => {
  try {
    const { email, cpf } = paramsObject;
    const alreadyRegistered = await connection("users")
      .select("*")
      .where({ email })
      .orWhere({ cpf })
      .first();

    if (alreadyRegistered) {
      return "Já existe um usuario cadastrado com esses dados";
    }
  } catch (error) {
    return error.message;
  }
};

module.exports = { validateRequireds, validateAlreadyRegistered };
