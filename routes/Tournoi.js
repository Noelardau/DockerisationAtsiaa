var express = require('express');
var router = express.Router();
var {Tournoi, db} = require("../models/lrbbhm")


router.post('/create', async function(req, res, next) {
  
  if(req.body.nomTournoi != undefined && req.body.lieuTournoi!= undefined && req.body.dateDebut != undefined && req.body.dateFin != undefined){

    let nomTournoi = req.body.nomTournoi
    let lieuTournoi = req.body.lieuTournoi
    let dateDebut = req.body.dateDebut
    let dateFin = req.body.dateFin

    let lastInsertedTournoi = await Tournoi.create({nomTournoi, lieuTournoi, dateDebut, dateFin})



    res.send({success:true, body:{tournoi: lastInsertedTournoi.dataValues,message:"tournoi enregistré!!!"}})


  }else{
    res.send({success:false, message:"Renseigner tout les champs!!!"})
  } 


});


router.get("/getAll/", async (req,res,next)=>{

  var [results] = await db.query("SELECT * FROM tournoi ORDER BY idTournoi DESC LIMIT 5");
  
  // var tournois = await Tournoi.findAll({limit:5,order:[["idTournoi","DESC"]],raw:true})
  
  

  
    res.send({success:true, body:results})
  
  })


  router.get("/getOne/:id",async (req,res,next)=>{

    let TournoiGet = await Tournoi.findOne({where: {idTournoi: req.params.id}})
  
      res.send({success:true, body:TournoiGet})
  
  })



  router.post('/update', async function(req, res, next) {
  
    if(req.body.nomTournoi != undefined && req.body.lieuTournoi!= undefined && req.body.dateDebut != undefined && req.body.dateFin != undefined && req.body.idTournoi != undefined){
  
      let nomTournoi = req.body.nomTournoi
      let lieuTournoi= req.body.lieuTournoi
      let dateDebut = req.body.dateDebut
      let dateFin = req.body.dateFin
     
  
      await Tournoi.update({nomTournoi, lieuTournoi, dateDebut, dateFin},{where:{
        idTournoi: req.body.idTournoi
      }})
  
      res.send({success:true, message:"Changement enregistré!!"})
  
  
    }else{
  
      res.send({success:false, message: "Veuillez renseigner tout les champs"})
    }
  
  
  });
  



  router.delete("/delete/:id", async (req,res,next)=>{

    await Tournoi.destroy({where: {idTournoi:req.params.id}})
  
    res.send({success:true, message:"Tournoi supprimé!!"})
  
  })  

  
module.exports = router;
