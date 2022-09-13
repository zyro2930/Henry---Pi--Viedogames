const { Router } = require('express');
const { Videogame, Genre, Platform } = require('../db.js');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
require('dotenv').config();
const {API_KEY} = process.env;
const axios = require('axios')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/videogames", (req,res)=>{
    let{name}=req.query
    if ( typeof name == 'undefined') {
        axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
        .then(resp =>{
            //console.log(resp.data.results)
            res.send(resp.data.results)})
    }else{
        axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
        .then(resp =>{
            //console.log(resp.data.results)
            res.send(resp.data.results)})
    }    
})

router.get("/videogames/:id", (req,res)=>{
    let newVideogame={}
    let{id}=req.params
    axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
    .then(resp =>{
         let {id,name,description,released,rating,rating_top,parent_platforms}=resp.data

         let platforms = parent_platforms.map(p=> p.platform.name)

        newVideogame={
            id,
            name,
            description,
            released,
            rating:rating + '/' + rating_top,
            platforms
        }
        res.json(newVideogame)
        })            
})
router.get("/genres",(req,res)=>{
    let genero={}
    axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    .then(resp => {
        let {results} = resp.data
        let generos = results.map(g => 
            genero = {id:g.id,
                     name:g.name
            })
        res.send(generos)
        })
})

function validatePost(body){
    if (!body.name) return true 
    return false
}

router.post("/videogames",(req,res)=>{
const error = validatePost(req.body)
if (error) return res.status(404).send("Faltan datos obligatorios")
    Videogame.create({...req.body})
    .then(vg =>{ res.status(201).json(vg)})
    .catch(err =>
        res.status(404).send("Error en alguno de los datos provistos"))
})

//-----------------PRUEBAS----------------------------
// NO ANDA PERO ES UN AXIOS EN UNA FUNCION
let videoGamesAll={}
const listado = ()=>{
    videoGamesAll = axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`)
    .then(resp =>{
        resp.data.results})
    return videoGamesAll.data
}
//CARGO EL RESULTADO DE LA FUNCION
router.get("/videogamess", (req,res)=>{
    console.log(listado())
    res.send(listado())
})
//RECIBIENDO EL NOMBRE DE UN JUEGO COMO PARAMETRO
router.get("/videogames/:name", (req,res)=>{
    let{name}=req.params
    axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
    .then(resp =>{
        console.log(resp.data.results)
        res.send(resp.data.results)})
    
})

module.exports = router;
