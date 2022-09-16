const { Videogame, Genre, Platform } = require('../db.js');
const axios = require('axios')
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
let getVideogames = async (name)=>{
    let newVideogame = {}    
    const condition = name ? { where: {name: { [Op.like]: `%${name}%` },}} : {} 
    let videoGamesDb = await Videogame.findAll({condition, attributes:['id','background_image','name'],
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
    let resp = typeof name == 'undefined'? await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
    :await axios.get(`https://api.rawg.io/api/games?search=${name}&page_size=15&key=${API_KEY}`)
    let genreApi={}
    let videoGamesApi = resp.data.results.map(g =>
        newVideogame={            
            id:g.id,
            background_image:g.background_image,
            name: g.name,            
            genres:g.genres.map(g=> genreApi={'id':g.id, 'name':g.name})
        }
    )
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
            const {id, name, description, released, rating, rating_top, platforms, genres} = resp.data
            newVideogame={
            id,
            name,
            description,
            released,
            rating: rating + '/' + rating_top,
            platforms: platforms.map(p=> p.platform.name),
            genres:genres.map(g=> g.name)
            }                      
        }   
        return newVideogame
    } catch (error) {
        return {'error':error.message}
    }  
}
function reportErrorPost(body){
    if (!body.name) return true 
    return false
}
let postVideogame = async (videoGame)=>{
    const error = reportErrorPost(videoGame)
    if (error) return res.status(404).send("Faltan datos obligatorios")
    const {genres} = req.body
    try {
        const vG = await Videogame.create({...req.body.videogame})
        if (vG) await vG.addGenres(genres)     
        return res.send( await Videogame.findByPk(vG.id,
            {include: [
                {
                    model: Genre,
                    attributes: ['id','name'],
                    through: {attributes: []}
                }
            ]}
            ))
    } catch (error) {        
        res.status(404).send(error.message)
    }  
}

module.exports={
    getPlatformsForFortnite,
    getGenres,
    getVideogames,
    getVideogameById,
    reportErrorPost,
    postVideogame
}