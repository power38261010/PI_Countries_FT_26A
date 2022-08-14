const { Router } = require('express');
const {  getAllCountries , getCountryId  } = require('../Middlewares/middleware.js')

// Importar todos los routers;

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', async (req,res, next)=>{
 
let allCountries = [];
const {name } = req.query
try{
allCountries = await getAllCountries (name);
allCountries.length ? res.status(200).send(allCountries) : res.status(400).send(`No se encontro ningun país con el nombre ${name}`)
}
catch(err){ next(err); }
})

router.get("/:id", async (req, res,next) => {
 
 const {id} = req.params;
 let idCountry = [];
 try{
     idCountry = await getCountryId (id);
    res.json(idCountry);
 }
 catch(err){ next(err); }
  });

module.exports = router;