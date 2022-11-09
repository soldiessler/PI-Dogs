const { Dog } = require("../db");

const postDog = async (req, res) => {
  try {
    const dog = req.body;
    
    let [newDog, d] = await Dog.findOrCreate({
      where: {
        name: dog.name, 
        min_height: dog.min_height,
        max_height: dog.max_height,
        min_weight: dog.min_weight,
        max_weight: dog.max_weight,
        min_life: dog.min_life,
        max_life: dog.max_life,
        image: dog.image || "https://i.ibb.co/gwvd8D9/default-picture.png",
      }
    })

    //console.log("newDog: ", newDog);
    //console.log("d: ", d);

    await newDog.setTemperaments(dog.temperament)

    return res.status(200).send(newDog)

  } catch(error) {
    return res.status(404).send({error: `The breed wasn't created`})
  }
};

module.exports = { postDog }

//img https://voluntariadoempresarial.com.br/wp-content/uploads/2020/07/iStock-1135995873.jpg