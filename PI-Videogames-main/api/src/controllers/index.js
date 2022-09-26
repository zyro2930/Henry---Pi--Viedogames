const { Videogame, Genre, Platform } = require('../db.js');
const axios = require('axios')
const { Op } = require('sequelize');
require('dotenv').config();
const {API_KEY} = process.env;

let getPlatformsForFortnite = async ()=>{
    let platformsDb = await Platform.findAll()
    if ( !platformsDb.length) {
        let platform={}
        let resp = await axios.get(`https://api.rawg.io/api/games/47137?key=${API_KEY}`)
        let platforms = resp.data.platforms.map(p => platform = {name:p.platform.name})
        platforms.forEach(p=>Platform.create(p))
        return platforms
    }    
    return platformsDb
}
let getGenres = async () => {
    let genresDb = await Genre.findAll()
    if (!genresDb.length){
        let genre={}
        let resp = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
        let genres = resp.data.results.map( g => genre = {name:g.name})
        genres.forEach(g=> Genre.create(g))
        return genres
    }
        return genresDb
}
let getApiVideogames = async (name)=>{
    let newVideogame = {}
    let resp = typeof name == 'undefined'? await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
    :await axios.get(`https://api.rawg.io/api/games?search=${name}&page_size=15&key=${API_KEY}`)
    let genreApi={}
    let videoGamesApi = resp.data.results.map(g =>
        newVideogame={            
            id:g.id,
            background_image:g.background_image,
            name: g.name,
            rating:g.rating,
            genres:g.genres.map(g=> genreApi={'id':g.id, 'name':g.name})
        }
    )
    return videoGamesApi
}
let getDbVideogames = async(name)=>{
    const condition = name ? { where: {name: { [Op.like]: `%${name}%` },}} : {} 
    let videoGamesDb = await Videogame.findAll({condition, attributes:['id','background_image','name','rating'],
        include:
                [
                    {
                        model: Genre, 
                        as :'genres',
                        attributes:['id','name'],
                        through:{attributes:[]}
                    }
                ]
        
    })
    return videoGamesDb
}
let getAllVideogames = async (name)=>{
const videoGamesDb = await getDbVideogames(name)
const videoGamesApi = await getApiVideogames(name)

allGames=[...videoGamesDb, ...videoGamesApi]
allGames.length ? allGames : {msg:'Sin resultados'}
return allGames
}
let getVideogameById = async (idParams)=>{
    let newVideogame = {}    
    try {
        if (idParams.includes('-') ) {
            newVideogame = await Videogame.findByPk(idParams,
                {include:
                    [
                        {
                            model: Genre,
                            attributes:['id','name'],
                            through:{attributes:[]}
                        }
                    ]
            })
        }else {
            const resp = await axios.get(`https://api.rawg.io/api/games/${idParams}?key=${API_KEY}`)
            const {id, name,background_image, description, description_raw, released, rating, rating_top, platforms, genres} = resp.data
            newVideogame={
            id,
            name,
            background_image,
            description:description_raw,
            released,
            rating: rating + '/' + rating_top,
            platforms: platforms.map(p=> p.platform.name),
            genres:genres.map(g=> g.name)
            }  
            //return resp.data//newVideogame                    
        }   
        return newVideogame
    } catch (error) {
        return {'error':error.message}
    }  
}
function reportErrorPost(infoBodyGame){
    if (!infoBodyGame.name || !infoBodyGame.description || !infoBodyGame.launch) return true 
    return false
}

let postVideogame = async (videoGame)=>{
    const error = reportErrorPost(videoGame)    
    if (error) return {'error':'Faltan datos obligatorios'}    

    let{name, description, launch, rating, platformsArray, genres, background_image}=videoGame
    let platforms = platformsArray.toString()
    try {
        const vG = await Videogame.create({
            name,description,launch,rating,background_image,platforms
        })
        if (vG) await vG.addGenres(genres)             
        console.log(vG.id)
        return  await Videogame.findByPk(vG.id,
            {include: 
                [
                    {
                        model: Genre,
                        as :'genres',
                        attributes: ['id','name'],
                        through: {attributes: []}
                    }
                 ]
            }
         )
    } catch (error) {        
        return {'error':error.message}
    }  
}

module.exports={
    getPlatformsForFortnite,
    getGenres,
    getVideogameById,
    reportErrorPost,
    postVideogame,
    getAllVideogames,
    getApiVideogames,
    getDbVideogames
}