const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;
const axios = require("axios");

const getDetail = async (req, res) => {
  const id = req.params.id;
  //db
  if (id.length === 36 && id.includes("-")) {
    try {
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

      let db = dbDogs.map(d => {
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

      const dogID = await db.find(d => d.id === id)
      if (!dogID){
        return res.status(404).send({error: 'Did you write well? This id does not match...'})
      }

      return res.status(200).send(dogID)

    } catch(e) {
      return res.status(404).send({error: 'Did you write well? This id does not match...'})
    }
    
  //api
  } else {
    
    try {
      const api = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);

      const dog = await api.data.find(d => d.id === parseInt(id))
      if (!dog){
        return res.status(404).send({error: 'Did you write well? This id does not match...'})
      }

      const dogID = {
        id: dog.id,
        name: dog.name,
        min_height: parseInt(dog.height.metric.split(" - ")[0]), 
        max_height: parseInt(dog.height.metric.split(" - ")[1]) || //cases id: 176, 219, 232
          parseInt(dog.height.metric.split(" - ")[0]),  
        min_weight: parseInt(dog.weight.imperial.split(" - ")[0]) || // cases id: 183, 221, 232
          parseInt(dog.weight.imperial.split(" - ")[1]), 
        max_weight: parseInt(dog.weight.imperial.split(" - ")[1]),
        min_life: parseInt(dog.life_span.split(" - ")[0]),
        max_life: parseInt(dog.life_span.split(" - ")[1]) || // cases id: 3, 24, 197
          parseInt(dog.life_span.split(" - ")[0]),
        temperament:
          dog?.temperament?.split(', ').join(' ') || // cases id: 196, 197, 261
          "Unknow",
        image: dog.image.url,
      };

      return res.status(200).send(dogID)

    } catch(error) {
      return res.status(404).send({error: 'Did you write well? This id does not match...'})
    }
  }
  
};

module.exports = { getDetail }