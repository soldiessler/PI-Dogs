const { Router } = require('express');
const router = Router();

const { getDetail } = require("../controllers/getDetail")
const { getDogs } = require("../controllers/getDogs");
const { postDog } = require("../controllers/postDog")

router.get("/", getDogs);
router.get("/:id", getDetail);
router.post("/create", postDog);

module.exports = router;

/*
--dogs
[ ] GET /dogs:
[ ] GET /dogs?name="..."
[ ] GET /dogs/{idRaza}
[ ] POST /dogs:
*/