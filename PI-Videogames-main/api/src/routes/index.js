const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const{getPlatformsForFortnite, getGenres, 
    getVideogames, getVideogameById, 
    postVideogame} = require('../controllers')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", async (req,res)=>{
    await getPlatformsForFortnite()//al Inicializar la ruta cargo en mi db las plataformas
    await getGenres()//al Inicializar la ruta cargo en mi db los generos
    const {name}=req.query
    let result = await getVideogames(name)
    res.json(result)
})
router.get("/:idParams", async (req,res)=>{      
    const {idParams}=req.params  
    let result = await getVideogameById(idParams)
    res.json(result)
})
router.post("/", async (req,res)=>{
    let result = postVideogame(req.body.videogame)
    res.json(result)
})
router.get("/videogames/platforms", async(req,res)=>{
    res.send(await getPlatformsForFortnite())
})
router.get("/videogames/genres", async(req,res)=>{
    res.send(await getGenres())
})

module.exports = router;
