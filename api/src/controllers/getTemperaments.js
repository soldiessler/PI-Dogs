const { Temperament } = require("../db");

const getTemperaments = async (req, res) => {
  try {
    const temperamentsDb = await Temperament.findAll()
    res.json(temperamentsDb);
  } catch(e) {
    console.log(e)
  }
};

module.exports = { getTemperaments }