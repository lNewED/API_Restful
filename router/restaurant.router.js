const express = require("express");
const router = express.Router();
const {getAll ,getById ,create, deleteById, updateById} = require ('../controllers/restaurant.controller.js')
// const {authJwt} = require("../middleware/index")


router.get("/restaurant", getAll);
router.get("/restaurant/:id", [authJwt.verifyToken, authJwt.isAdmin], getById)
router.post('/restaurant', create)
router.delete('/restaurant/:id', [authJwt.verifyToken, authJwt.isAdmin],deleteById)
router.put('/restaurant/:id', [authJwt.verifyToken, authJwt.isAdmin],updateById)

module.exports = router;
