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

const routes = express();

routes.post("/usuarios", registerUser); //cadastrar usuario
routes.get("/usuarios/login", signInUser); //autenticar usuario

routes.get("/parceiros", listAllPartners); //listar parceiros

routes.get("/produtos", listAllProducts); //listar todos os produtos
routes.get("/produtos/:productId", getProductById); //listar produto por id

//-----rotas que exigem autenticação------\\
routes.use(verifyLogin);

routes.put("/usuarios", editUser); //editar usuario

routes.post("/usuarios/enderecos", registerAddress); //cadastrar endereço
routes.get("/usuarios/enderecos", listAllAddresses); //listar endereços
routes.put("/usuarios/enderecos/:id", editAddress); //editar endereço
routes.delete("/usuarios/enderecos/:id", deleteAddress); //deletar endereço

routes.get("/usuarios/pontos", listPoints); //listar pontos acumulados

routes.post("/usuarios/produtos/:productId", redeemProduct); //resgatar produto

module.exports = routes;
