const { Router } = require('express');
const activityRoute = require ('./activities');
const countryRoute = require ('./countries');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/activity', activityRoute) 
router.use('/countries', countryRoute) 


module.exports = router;