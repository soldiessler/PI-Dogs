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
          life_span: d.life_span,
          image: d.image,
          temperament: d.temperaments.map(t => {return t.name}).join(' '),
        }
      })

      const dogID = await db.find(d => d.id === id)
      if (!dogID){
        return res.send({error: 'Did you write well? This id does not match...'})
      }

      return res.json(dogID)

    } catch(e) {
      console.log(e)
    }
    
  //api
  } else {
    
    try {
      const api = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);

      const dog = await api.data.find(d => d.id === parseInt(id))
      if (!dog){
        return res.send({error: 'Did you write well? This id does not match...'})
      }

      const dogID = {
        id: dog.id,
        name: dog.name,
        min_height: parseInt(dog.height.metric.split(" - ")[0]),
        max_height: parseInt(dog.height.metric.split(" - ")[1]),
        min_weight: parseInt(dog.weight.metric.split(" - ")[0]),
        max_weight: parseInt(dog.weight.metric.split(" - ")[1]),
        life_span: dog.life_span,
        temperament:
          dog?.temperament?.split(', ').join(' ') || "Unknow",
        image: dog?.image?.url || dog?.image,
      };

      res.json(dogID)

    } catch(e) {
      console.log(e)
    }
  }
  
};

module.exports = { getDetail }