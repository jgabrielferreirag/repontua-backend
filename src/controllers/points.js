const connection = require("../database/connection");

const listPoints = async (req, res) => {
  const { userId } = req;
  try {
    const points = await connection("user_points").where({ user_id: userId });
    return res.status(200).json(points);
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

module.exports = { listPoints };
