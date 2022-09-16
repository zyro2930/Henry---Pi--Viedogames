//Traigo los tipos de datos del orm 
const {DataTypes} = require("sequelize")
//exporto la funcion que define el modelo(tabla)
module.exports = (sequelize) =>{
sequelize.define(
    'Genre',
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey :  true
        },
        name:{
            type:DataTypes.STRING        
        }
    },{
        timestamps:false,
        createdAt:false,
        updatedAt:'actualizado'
    })
}