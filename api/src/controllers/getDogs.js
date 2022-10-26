const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;
const axios = require("axios");

const apiDogs = async() => {
  const api = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
  let apiDogs = api.data?.map((d) => {   
    return {
      id: d.id,
      name: d.name, 
      height: d.height.metric,
      weight: d.weight.metric,
      life_span: d.life_span,
      image: d.image.url,
      temperament: d?.temperament?.split(', '),
    }
  })
  return apiDogs
}

const dbDogs = async() => {
  const dbDogs = await Dog.findAll({
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
  return dbDogs;
}

const getDogs = async (req, res) => {
  const name = req.query.name;

  const api = await apiDogs();
  const db = await dbDogs();
  const dogs = await api.concat(db);

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