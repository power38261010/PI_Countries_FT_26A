const { Router } = require('express');
const { newActivity, getAllActivities,  deleteActivity} = require('../Middlewares/middleware.js')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', async (req,res , next) => {
 try{
     let getAll =  await getAllActivities();
     getAll.length ? res.status(200).send(getAll) : res.status(404).send("No hay actividades")
 }
 catch(err){ next(err); }
})

router.post("/", async (req, res, next) => {
try 
{ const {name , difficulty, duration, season, countryId} = req.body;
 let newAct = await newActivity ( name, difficulty, duration, season, countryId ) ;
//  console.log(Object.entries(newAct));
  res.status(200).send(newAct);
}

  catch(err){ next(err); }
})

router.delete('/:id',async (req,res,next)=>{
    const id = req.params.id;
 try{
     let deleteAct = await deleteActivity(id);
     res.send(deleteAct)
 }
 catch(err){ next(err); }
})

module.exports = router;