const connection = require("../database/connection");

const listPickupLocations = async (req, res) => {
  try {
    const allLocations = await connection("pickup_locations");
    return res.status(200).json(allLocations);
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

module.exports = {
  listPickupLocations,
};
