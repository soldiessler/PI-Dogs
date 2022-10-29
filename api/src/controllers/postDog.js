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
        life_span: dog.life_span,
        image: dog.image,
        created: true,
      }
    })

    console.log("newDog: ", newDog);
    console.log("d: ", d);

    await newDog.setTemperaments(dog.temperament)
    return res.send(newDog)

  } catch(e) {
    console.log(e)
  }
};

module.exports = { postDog }