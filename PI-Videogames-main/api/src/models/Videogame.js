const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'Videogame', 
    {
    id:{
      type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING
    },
    launch: {
      type: DataTypes.STRING
    },
    rating: {
      type: DataTypes.STRING
    },
    platforms: {
      type: DataTypes.STRING
    },
    background_image: {
      type: DataTypes.STRING
    }
  },
  {
        // timestamps: false
        timestamps: true,
        createdAt: false,
        updatedAt: 'actualizado'
  });
};
