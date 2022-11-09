const axios = require("axios");
const { API_KEY } = process.env;
const { Temperament } = require("../db");

const setTemperaments = async (req, res) => {
  try {
    const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    let temperaments = [];
    data.forEach(d => {
      if(d.temperament) {
        let t = d.temperament.split(', ');
        t.map((e) => temperaments.push(e));
      }
    });
    
    temperaments.forEach(async (t) => {
      await Temperament.findOrCreate({
        where: {name: t}
      })
    })

  } catch(error) {
    return res.status(404).send({error: 'Temperaments loading fail'})
  }
};

module.exports = { setTemperaments }