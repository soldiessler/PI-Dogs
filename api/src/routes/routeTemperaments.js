const { Router } = require('express');
const router = Router();

const { getTemperaments } = require("../controllers/getTemperaments");

router.get('/', getTemperaments);

module.exports = router;

/*
--temperaments
[ ] GET /temperaments
*/