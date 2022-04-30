const connection = require("../database/connection");

const listAllProducts = async (req, res) => {
  try {
    const productsList = await connection("products").select("*");

    return res.status(200).json(productsList);
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

const redeemProduct = async (req, res) => {
  const { userId } = req;
  const { productId } = req.params;

  try {
    const { price } = await connection("products")
      .where({ id: productId })
      .first();
    const { amount } = await connection("user_points")
      .where({ user_id: userId })
      .first();

    if (price > amount) {
      return res.status(200).json({
        message: "Você não possui saldo suficiente para resgatar esse produto",
      });
    }
    const newBalance = amount - price;
    const updatePointsBalance = await connection("user_points")
      .update({
        amount: newBalance,
      })
      .where({ user_id: userId });

    return res.status(200).json({ message: "Produto resgatado com sucesso" });
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

module.exports = {
  listAllProducts,
  redeemProduct,
};
