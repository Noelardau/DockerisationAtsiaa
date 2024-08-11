var express = require('express');
var router = express.Router();
var {User} = require("../models/lrbbhm")

/* GET home page. */
router.post('/connexion', async function(req, res, next) {
    
    let pseudo = req.body.pseudo
    let password = req.body.password

    let validate = await User.findAll({where: {pseudo,password}})

    res.send(validate.length != 0 ? {connected:true} : {connected: false})


});

module.exports = router;
