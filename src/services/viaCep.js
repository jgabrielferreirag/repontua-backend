const axios = require("axios");

const axiosInstance = axios.create({
  baseURL: "https://viacep.com.br/ws/",
});

module.exports = axiosInstance;
