const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const{getPlatformsForFortnite, getGenres, 
    getVideogameById, postVideogame, getAllVideogames,
    getApiVideogames,getDbVideogames} = require('../controllers')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get("/all", async (req,res)=>{
    await getPlatformsForFortnite()//al Inicializar la ruta cargo en mi db las plataformas
    let result = await getAllVideogames()
    res.json(result)
})
router.get("/api", async (req,res)=>{
    const {name}=req.query
    let result = await getApiVideogames(name)
    res.json(result)
})
router.get("/db", async (req,res)=>{
    const {name}=req.query
    let result = await getDbVideogames(name)
    res.json(result)
})
router.get("/gamesByName", async (req,res)=>{    
    const {name}=req.query
    let result = await getAllVideogames(name)
    res.json(result)
})
router.get("/:idParams", async (req,res)=>{      
    const {idParams}=req.params  
    let result = await getVideogameById(idParams)
    res.json(result)
})
router.post("/", async (req,res)=>{
    let result = await postVideogame(req.body)
    res.json(result)
})
router.get("/games/platforms", async(req,res)=>{
    res.send(await getPlatformsForFortnite())
})
router.get("/games/genres", async(req,res)=>{
    res.send(await getGenres())
})

module.exports = router;
