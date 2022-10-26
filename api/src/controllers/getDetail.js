const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;
const axios = require("axios");

const getDetail = async (req, res) => {
  const id = req.params.id;
  //db
  if (id.length === 36 && id.includes("-")) {
    try {
      const db = await Dog.findAll({
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
        weight: dog.weight,
        height: dog.hight,
        life_span: dog.life_span,
        temperament:
          dog?.temperament?.split(', '),
        image: dog?.image?.url || dog?.image,
      };

      res.json(dogID)

    } catch(e) {
      console.log(e)
    }
  }
  
};

module.exports = { getDetail }