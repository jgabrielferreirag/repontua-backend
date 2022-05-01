const express = require("express");
const { registerUser, editUser, signInUser } = require("./controllers/users");
const { listAllPartners } = require("./controllers/partners");
const { verifyLogin } = require("./middleware/verifyLogin");
const {
  listAllAddresses,
  registerAddress,
  editAddress,
  deleteAddress,
} = require("./controllers/address");
const { listPoints } = require("./controllers/points");
const {
  listAllProducts,
  redeemProduct,
  getProductById,
} = require("./controllers/products");
const { listPickupLocations } = require("./controllers/pickup");

const routes = express();
routes.get("/", (req, res) => {
  return res.status(200).json("API Backend RePontua");
});

routes.post("/usuarios", registerUser); //cadastrar usuario
routes.get("/usuarios/login", signInUser); //autenticar usuario

routes.get("/parceiros", listAllPartners); //listar parceiros

routes.get("/produtos", listAllProducts); //listar todos os produtos
routes.get("/produtos/:productId", getProductById); //listar produto por id
routes.get("/pontos-coleta", listPickupLocations); //listar todos os pontos de coleta

//-----rotas que exigem autenticação------\\
routes.put("/usuarios", verifyLogin, editUser); //editar usuario

routes.post("/usuarios/enderecos", verifyLogin, registerAddress); //cadastrar endereço
routes.get("/usuarios/enderecos", verifyLogin, listAllAddresses); //listar endereços
routes.put("/usuarios/enderecos/:id", verifyLogin, editAddress); //editar endereço
routes.delete("/usuarios/enderecos/:id", verifyLogin, deleteAddress); //deletar endereço

routes.get("/usuarios/pontos", verifyLogin, listPoints); //listar pontos acumulados

routes.post("/usuarios/produtos/:productId", verifyLogin, redeemProduct); //resgatar produto
module.exports = routes;
