const connection = require("../database/connection");

const listAllPartners = async (req, res) => {
  try {
    const partners = await connection("partners").select("*");
    return res.status(200).json(partners);
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

module.exports = {
  listAllPartners,
};
