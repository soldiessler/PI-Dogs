const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const routeDogs = require("./routeDogs.js");
const routeTemperaments = require("./routeTemperaments.js");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/dogs", routeDogs);
router.use("/temperaments", routeTemperaments);

module.exports = router;

/*
--dogs
[ ] GET /dogs:
[ ] GET /dogs?name="..."
[ ] GET /dogs/{idRaza}
[ ] POST /dogs:

--temperaments
[ ] GET /temperaments:
*/