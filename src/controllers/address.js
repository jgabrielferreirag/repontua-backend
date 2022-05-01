const connection = require("../database/connection");
const { validateRequireds } = require("../validations/validations");

const listAllAddresses = async (req, res) => {
  const { userId } = req;
  try {
    const addressList = await connection("address").where({ user_id: userId });
    return res.status(200).json(addressList);
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

const registerAddress = async (req, res) => {
  const requiredError = validateRequireds(req);
  if (requiredError) {
    return res.status(401).json({ mensagem: requiredError });
  }

  const { userId } = req;
  const { name, address, cep } = req.body;
  try {
    const addressListed = await connection("address").insert({
      name,
      address,
      cep,
      user_id: userId,
    });
    return res.status(200).json("Endereço cadastrado com sucesso");
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

const editAddress = async (req, res) => {
  const requiredError = validateRequireds(req);
  if (requiredError) {
    return res.status(401).json({ mensagem: requiredError });
  }

  const { userId } = req;
  const { id } = req.params;
  const { name, address, cep } = req.body;
  try {
    const addressEdited = await connection("address")
      .update({
        name,
        address,
        cep,
      })
      .where({ id, user_id: userId })
      .returning("*");
    if (addressEdited.length === 0) {
      return res.status(404).json("Não foi possivel editar o endereço");
    }
    return res.status(200).json("Endereço atualizado com sucesso");
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

const deleteAddress = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;
  try {
    const deletedAddress = await connection("address")
      .where({ id, user_id: userId })
      .delete()
      .returning("*");
    if (deletedAddress.length === 0) {
      return res.status(404).json("Não foi possivel deletar o endereço");
    }
    return res.status(200).json("Endereço deletado com sucesso");
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

module.exports = {
  listAllAddresses,
  registerAddress,
  editAddress,
  deleteAddress,
};
