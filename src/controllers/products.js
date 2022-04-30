const connection = require("../database/connection");

const listAllProducts = async (req, res) => {
  try {
    const productsList = await connection("products").select("*");

    return res.status(200).json(productsList);
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

module.exports = {
  listAllProducts,
};
