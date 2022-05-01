const connection = require("../database/connection");
const axiosInstance = require("../services/viaCep");

const listPickupLocations = async (req, res) => {
  try {
    const allLocations = await connection("pickup_locations");
    return res.status(200).json(allLocations);
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

const listPickupLocationByProximity = async (req, res) => {
  const { cep } = req.params;

  axiosInstance.defaults.baseURL += `${cep}/json`;
  const { data } = await axiosInstance.get();
  console.log(data);
  try {
    const closeLocations = await connection("pickup_locations").where({
      city: data.localidade,
    });
    console.log(closeLocations);
    return res.status(200).json(closeLocations);
  } catch (error) {
    return res.status(404).json();
  }
};

module.exports = {
  listPickupLocations,
  listPickupLocationByProximity,
};
