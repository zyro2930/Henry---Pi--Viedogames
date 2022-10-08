const { Videogame, Genre, Platform } = require('../db.js');
const axios = require('axios')
const { Op } = require('sequelize');
const { config } = require('dotenv');
require('dotenv').config();
const {API_KEY} = process.env;

let getPlatformsForFortnite = async ()=>{
    let platformsDb = await Platform.findAll()
    if ( !platformsDb.length) {
        let {data} = await axios.get(`https://api.rawg.io/api/games/47137?key=${API_KEY}`)
        let platformsApi = data.platforms.map(p=>{            
            Platform.create({name:p.platform.name})
            return ({name:p.platform.name})
        })
        platformsDb = [...platformsDb,...platformsApi]
    }
    return platformsDb
}
let getGenres = async () => {
    let genresDb = await Genre.findAll()
    if (!genresDb.length){
        let {data} = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
        let genresApi = data.results.map(g=>{
            Genre.create({name:g.name})
            return ({name:g.name})
        })
        genresDb=[...genresDb,...genresApi]
    }
    return genresDb
}
let cargarGames = (resp)=>{
    let videoGamesApi = resp.data.results.map(g =>{
        return{
            id:g.id,
            background_image:g.background_image,
            name: g.name,
            rating:g.rating,
            genres:g.genres.map(g=> {
                return {'id':g.id, 'name':g.name}
            })
        }})        
    return videoGamesApi
}
let getApiVideogames = async (name)=>{
    let videoGamesApi = []
    if (typeof name === 'undefined'){
        let URL=`https://api.rawg.io/api/games?key=${API_KEY}&page_size=40`
        for (let i=1; i<=3 ;i++){
            let resp = await axios.get(URL,config)
            videoGamesApi = [...videoGamesApi, ...cargarGames(resp)]
            console.log(i)
            URL = resp.data.next
        }
    }else{
        let URL=`https://api.rawg.io/api/games?search=${name}&page_size=15&key=${API_KEY}`
        resp = await axios.get(URL)
        videoGamesApi = cargarGames(resp)
    }
    return videoGamesApi
}
let getDbVideogames = async(name)=>{
    const condition = name ? { where: {name: { [Op.like]: `%${name}%` },}} : {}
    let videoGamesDb = await Videogame.findAll({condition, attributes:
        ['id','background_image','name','rating'],
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
    genresArray=[]
    try {
        if (idParams.includes('-') ) {
            newVideogame = await Videogame.findByPk(idParams,
                {include:
                    [
                        {
                            model: Genre,
                            as :'genres',
                            attributes:['id','name'],
                            through:{attributes:[]}
                        }
                    ]
            })
        }else {

            const resp = await axios.get(`https://api.rawg.io/api/games/${idParams}?key=${API_KEY}`)
            const {id, name,background_image, description_raw, released, rating, rating_top, platforms, genres} = resp.data
            newVideogame={
            id,
            name,
            background_image,
            description:description_raw,
            released,
            rating: rating + '/' + rating_top,
            platforms: platforms.map(p=> p.platform.name).toString(),
            genres: genres.map(g=> genresArray={'id':g.id,'name':g.name})
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

    let{name, description, launch, rating, platformsArray, genres, background_image} = videoGame
    let platforms = platformsArray.toString()
    try {
        const vG = await Videogame.create({
            name,description,launch,rating,background_image,platforms
        })
        //console.log(vG.__proto__)
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
    getDbVideogames,
}