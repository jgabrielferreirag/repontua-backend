# Repontua Backend

Solução para o ProviHack do Agora

## 
O projeto do Backend foi desenvolvido utilizando NodeJS, framework Express para construção de API Rest e PostgreSQL como banco de dados. Também foi utilizado o Secure Password para encriptar as senhas de cadastro e o Knex como Query Builder.
A plataforma utilizada para deploy do servidor foi a Heroku. Implementei validações de token de autenticação, requisitos obrigatórios do corpo da requisição e de repetição de cadastro de usuario

### Endpoints

Foi gerado um JSON com os endpoints configurados no Insomnia para testagem.

### Rotas

#### /usuarios


##### POST: Cadastrar usuario na aplicação. Os usuarios serão cadastrados com 200 pontos iniciais, para testagem da rota de resgate

Formato do body da requisição. Todos os valores são obrigatórios.
```json
{
"name": "",
"cpf": "",
"email": "",
"password": ""
}
```
Response: "Usuario cadastrado com sucesso"

##### PUT: Editar dados do usuario. Todos os valores são obrigatórios.

Formato do body da requisição
```json
{
	"name": "",
	"email": "",
	"password": ""
}
```

Response: "Usuario atualizado com sucesso"

###### POST /login : Logar com o cadastro do usuario. Todos os valores são obrigatórios

Formato do body da requisição
```json
{
	"email": "",
	"password": ""
}
```
Response: JSON com informações de ID, email, e token do usuario
```json
{
	"usuario": {
		"id": ,
		"email": ""
	},
	"token": ""
}
```

#### /usuarios/enderecos  - Para todos os verbos desta rota não será necessário fornecer o ID do usuario, este sera passado pelo token.

##### GET: Listar todos os endereços
Response: Array com os endereços
```json
[
	{
		"id": ,
		"name": "",
		"address": "",
		"cep": "",
		"user_id": 
	}
]
```

##### POST: Cadastrar novo endereço

Formato do body da requisição. Todos os valores são obrigatórios.
```json
{
	"name" : "",
	"address": "",
	"cep": ""
}
```

Response: "Endereço cadastrado com sucesso"

##### PUT /:id . Editar dados do endereço id

Formato do body da requisição. Todos os valores são obrigatórios.
```json
{
	"name" : "",
	"address": "",
	"cep": ""
}
```

Response: "Endereço atualizado com sucesso"

##### DEL /:id . Deletar endereço id

Response: "Endereço deletado com sucesso"

#### /pontos

##### GET. Listar todos os pontos do usuario logado. ID de usuario passado pelo token

Response: 
```json
[
	{
		"id": ,
		"amount": ,
		"user_id": 
	}
]
```

#### /parceiros

##### GET. Listar todos os parceiros cadastrados na plataforma.

Response:
[
	{
		"id": ,
		"name": "",
		"cep": "",
		"cnpj": "",
		"logo_url": "",
		"city": "",
		"site_url": ""
	}
]

#### /pontos-coleta

##### GET. Listar todos os pontos de coleta

Response:
```json
[
	{
		"id": ,
		"address": "",
		"cep": "",
		"city": "",
		"state": "",
		"maps_url": ""
	}
]
```

#### /produtos

##### GET. Listar todos os produtos cadastrados na plataforma

Response: 
```json
[
	{
		"id": ,
		"name": "",
		"description": "",
		"price": ,
		"img_url": "",
		"category_id": ,
		"partner_id": 
	}
]
```
##### GET /:id. Listar produto Id

Response:
```json
[
	{
		"id": ,
		"name": "",
		"description": "",
		"price": ,
		"img_url": "",
		"category_id": ,
		"partner_id": 
	}
]
```

#### POST /usuarios/produtos/:id. Resgatar o produto Id caso haja saldo de pontos suficiente.

Response: "Produto resgatado com sucesso" ou "Você não possui saldo suficiente para resgatar esse produto"

