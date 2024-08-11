var express = require('express');
var router = express.Router();
const {Equipe, Joueur, db} = require("../models/lrbbhm")

router.post('/create', async function(req, res, next) {

  if(req.body.nomEquipe != undefined && req.body.origineEquipe != undefined){

    let nomEquipe = req.body.nomEquipe
    let origineEquipe = req.body.origineEquipe
    let tel = req.body.tel

    let lastInsertedEquipe = await Equipe.create({nomEquipe, origineEquipe,tel})

    // console.log(lastInsertedEquipe.dataValues.idEquipe) recuperer le dernier id pour l'insertion de coach!!


    res.send({success: true, body:lastInsertedEquipe });
  }else{
    res.send({success: false, message:"Veuillez renseigner tout les champs!?" });

  }

});


router.get("/getEquipe/:id", async (req,res,next)=>{
  let idEquipe = req.params.id
  
  let equipe = await Equipe.findAll({where:{idEquipe}})
 

  res.send({success:true, body:equipe})
})

router.get("/getEquipeDetail/:id", async (req,res,next)=>{
  let idEquipe = req.params.id
  
  let equipe = await Equipe.findAll({where:{idEquipe}})
  let joueurEquipe = await Joueur.findAll({where: {equipeIdEquipe: req.params.id}})
  var [results] = await db.query("SELECT * FROM joueur j JOIN categorie c ON j.categorieIdCategorie = c.idCategorie WHERE  j.equipeIdEquipe = ? ",{
    replacements:[req.params.id]
  });

  res.send({success:true, body:{equipe:equipe[0], joueurs:results}})
})


router.get("/getAll/", async (req,res,next)=>{

  
  let equipes = await Equipe.findAll({order:[["idEquipe","DESC"]]})

  res.send({success:true, body:equipes})
})





router.post('/update', async function(req, res, next) {
  
  if(req.body.nomEquipe != undefined && req.body.origineEquipe!= undefined && req.body.tel != undefined){

    let nomEquipe = req.body.nomEquipe
    let origineEquipe= req.body.origineEquipe
    let tel= req.body.tel
   

    await Equipe.update({nomEquipe, origineEquipe, tel},{where:{
      idEquipe: req.body.idEquipe
    }})

    res.send({success:true, message:"Changement enregistré!!"})


  }else{

    res.send({success:false, message: "Veuillez renseigner tout les champs"})
  }


});


router.delete("/delete/:id", async (req,res,next)=>{

  await Equipe.destroy({where: {idEquipe:req.params.id}})

  res.send({success:true, message:"Equipe supprimé!!"})

})




module.exports = router;
