var express = require('express');
var router = express.Router();
var {StatJoueur} = require("../models/lrbbhm")

/* GET home page. */
router.post('/add',async function(req, res, next) {
    let lastInserted = await StatJoueur.create({rencontreIdRencontre:req.body.rencontreIdRencontre, joueurIdJoueur: req.body.joueurIdJoueur})

    res.send({success:true, body:lastInserted})
});

router.post("/delete",async (req,res,next)=>{
    
    await StatJoueur.destroy({where:{
        rencontreIdRencontre: req.body.rencontreIdRencontre,
        joueurIdJoueur: req.body.joueurIdJoueur}
    })

    res.send({success:true, body:"delete with success!"})

})

router.post("/changeSet", async (req,res)=>{

    let joueurIdJoueur = req.body.joueurIdJoueur
    let rencontreIdRencontre = req.body.rencontreIdRencontre
    let onSet = req.body.onSet

  let body =  await StatJoueur.update({onSet},{where:{joueurIdJoueur,rencontreIdRencontre}})

  res.send({success:"olay",body})
})


router.post("/updateStat", async (req,res)=>{

    let totalPointMarque = req.body.totalPointMarque
    let tirsRates = req.body.tirsRates
    let tirsReussis = req.body.tirsReussis
    let perteDeBalle = req.body.perteDeBalle
    let blockRealise = req.body.blockRealise
    let passeD = req.body.passeD
    let rencontreIdRencontre = req.body.rencontreIdRencontre
    let joueurIdJoueur = req.body.joueurIdJoueur

    let body = await StatJoueur.update({totalPointMarque, tirsRates, tirsReussis, perteDeBalle, blockRealise, passeD},{where:{rencontreIdRencontre, joueurIdJoueur}})

    res.send({success:"hey", body})



})


router.post("/updateTime", async (req,res)=>{

    let newTime = req.body.newTime
    let joueurIdJoueur = req.body.idJoueur
    let rencontreIdRencontre = req.body.idRencontre
    let body = await StatJoueur.update({tempsJoue:newTime},{where:{joueurIdJoueur,rencontreIdRencontre}})

    res.send({body})

})

module.exports = router;
