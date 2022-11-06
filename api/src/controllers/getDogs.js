const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;
const axios = require("axios");

const apiDogs = async() => {
  const api = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
  let apiDogs = api.data?.map((d) => {   
    return {
      id: d.id,
      name: d.name, 
      min_height: parseInt(d.height.metric.split(" - ")[1]),
      max_height: parseInt(d.height.metric.split(" - ")[1]),
      min_weight: parseInt(d.weight.metric.split(" - ")[0]),
      max_weight: parseInt(d.weight.metric.split(" - ")[1]),
      life_span: d.life_span,
      image: d.image.url,
      temperament: d?.temperament?.split(', ').join(' ') || "Unknow",
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
      life_span: d.life_span,
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
      return res.send(dogByName)
    } else {
      return res.send({error: 'Did you write well? There is no dog with this name...'})
    }

  } else {
    res.send(dogs)
  }
  
  } catch(e) {
    console.log(e)
  }
};

module.exports = { getDogs }