const { Temperament } = require("../db");

const getTemperaments = async (req, res) => {
  try {
    const temperamentsDb = await Temperament.findAll()
    return res.status(200).json(temperamentsDb);
  } catch(error) {
    return res.status(404).send({error: 'Temperaments not found'})
  }
};

module.exports = { getTemperaments }