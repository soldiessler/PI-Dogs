const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;
const axios = require("axios");

const apiDogs = async() => {
  const api = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
  let apiDogs = api.data?.map((d) => {   
    return {
      id: d.id,
      name: d.name,
      min_height: parseInt(d.height.metric.split(" - ")[0]), 
      max_height: parseInt(d.height.metric.split(" - ")[1]) || //cases id: 176, 219, 232
        parseInt(d.height.metric.split(" - ")[0]),  
      min_weight: parseInt(d.weight.imperial.split(" - ")[0]) || // cases id: 183, 221, 232
        parseInt(d.weight.imperial.split(" - ")[1]), 
      max_weight: parseInt(d.weight.imperial.split(" - ")[1]),
      min_life: parseInt(d.life_span.split(" - ")[0]),
      max_life: parseInt(d.life_span.split(" - ")[1]) || // cases id: 3, 24, 197
        parseInt(d.life_span.split(" - ")[0]),
      temperament:
        d?.temperament?.split(', ').join(' ') || // cases id: 196, 197, 261
        "Unknow",
      image: d.image.url,
    }
  })
  return apiDogs
}

const dbDogs = async() => {
  let dbDogs = await Dog.findAll({
    include: {
      model: Temperament,
      attributes: {
        include: ['name'],
      },
      through: {
        attributes:[]
      }
    }
  })

  dbDogs = dbDogs.map(d => {
    return{
      id: d.id,
      name: d.name, 
      min_height: d.min_height,
      max_height: d.max_height,
      min_weight: d.min_weight,
      max_weight: d.max_weight,
      min_life: d.min_life,
      max_life: d.max_life,
      image: d.image,
      temperament: d.temperaments.map(t => {return t.name}).join(' '),
    }
  })

  return dbDogs;
}

const getDogs = async (req, res) => {
  const name = req.query.name;

  const api = await apiDogs();
  const db = await dbDogs();
  const dogs = await db.concat(api);

  try {
    if (name) {
      const dogByName = dogs.filter((dog) => dog.name.toLowerCase().includes(name.toLowerCase()))
      if (dogByName.length){
        return res.status(200).send(dogByName)
      } else {
        return res.status(404).send({error: 'Did you write well? There is no dog with this name...'})
      }

    } else {
      return res.status(200).send(dogs)
    }
  
  } catch(error) {
    return res.status(404).send({error: 'Did you write well? There is no dog with this name...'})
  }
};

module.exports = { getDogs }