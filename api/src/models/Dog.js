const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[a-zA-Z ]*$/,
      },
    },
    min_height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    max_height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    min_weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    max_weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    min_life: {
      type: DataTypes.INTEGER,
    },
    max_life: {
      type: DataTypes.INTEGER,
    },
    image: {
      type: DataTypes.STRING,
    }
  },
  { timestamps : false }
  );
};

/*[ ] Raza con las siguientes propiedades:
✔ ID *
✔ Nombre *
✔ Altura *
✔ Peso *
✔ Años de vida
✔ Imagen
*/