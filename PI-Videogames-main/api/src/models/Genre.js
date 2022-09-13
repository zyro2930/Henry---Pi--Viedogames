//Traigo los tipos de datos del orm 
const {DataTypes, INTEGER} = require("sequelize")
//exporto la funcion que define el modelo(tabla)
module.exports = (sequelize) =>{
sequelize.define('Genre',{
    ID:{
        type: DataTypes.INTEGER,
        primaryKey :  true
    },
    Name:{
        type:DataTypes.STRING        
    }

},{
    timestamps:false,
    createdAt:false,
    updatedAt:'actualizado'
})
}