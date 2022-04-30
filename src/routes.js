const express = require("express");
const { registerUser, editUser } = require("./controllers/users");
const { signInUser } = require("./controllers/login");
const { listAllPartners } = require("./controllers/partners");
const { verifyLogin } = require("./middleware/verifyLogin");
const {
  listAllAddresses,
  registerAddress,
  editAddress,
  deleteAddress,
} = require("./controllers/address");
const { listPoints } = require("./controllers/points");
const { listAllProducts, redeemProduct } = require("./controllers/products");

const routes = express();

routes.post("/usuarios", registerUser); //cadastrar usuario
routes.get("/parceiros", listAllPartners); //listar parceiros
routes.get("/login", signInUser); //autenticar usuario
routes.get("/produtos", listAllProducts); //listar todos os produtos

//-----rotas que exigem autenticação------\\
routes.use(verifyLogin);

routes.put("/usuarios", editUser); //editar usuario

routes.post("/usuarios/endereco", registerAddress); //cadastrar endereço
routes.get("/usuarios/endereco", listAllAddresses); //listar endereços
routes.put("/usuarios/endereco/:id", editAddress); //editar endereço
routes.delete("/usuarios/endereco/:id", deleteAddress); //deletar endereço

routes.get("/usuarios/pontos", listPoints); //listar pontos acumulados

routes.post("/usuarios/produto/:productId", redeemProduct); //resgatar produto

module.exports = routes;
