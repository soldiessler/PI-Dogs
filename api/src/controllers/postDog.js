const { Dog } = require("../db");

const postDog = async (req, res) => {
  try {
    const dog = req.body;
    let [newDog, d] = await Dog.findOrCreate({
      where: {
        name: dog.name, 
        height: dog.height,
        weight: dog.weight,
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