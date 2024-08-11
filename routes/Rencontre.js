var express = require('express');
var router = express.Router();
var {Rencontre, Equipe, db} = require("../models/lrbbhm")


router.post('/create/:idTournoi', async function(req, res, next) {
  
  if(req.body.idEquipe1 != undefined && req.body.idEquipe2 != undefined && req.body.lieuRencontre != undefined && req.body.dateRencontre != undefined && req.body.heureRencontre != undefined && req.body.categorieIdCategorie != undefined && req.body.sexe != undefined){

    let idEquipe1 = req.body.idEquipe1
    let idEquipe2 = req.body.idEquipe2
    let lieuRencontre= req.body.lieuRencontre
    let dateRencontre = req.body.dateRencontre
    let heureRencontre = req.body.heureRencontre
    let categorieIdCategorie = req.body.categorieIdCategorie
    let sexe = req.body.sexe
    let tournoiIdTournoi = req.params.idTournoi
    try {
      let lastInsertedTournoi = await Rencontre.create({idEquipe1, idEquipe2, lieuRencontre, dateRencontre, heureRencontre, categorieIdCategorie, sexe,tournoiIdTournoi})
      
      let rencontre = {...lastInsertedTournoi.dataValues}
  
      let equipe1 = await Equipe.findOne({attributes:["nomEquipe"],where:{idEquipe:idEquipe1}})
      let equipe2 = await Equipe.findOne({attributes:["nomEquipe"],where:{idEquipe:idEquipe2}})
  
      rencontre.nomEquipe1 = equipe1.dataValues.nomEquipe
      rencontre.nomEquipe2 = equipe2.dataValues.nomEquipe
  
      // console.log(rencontre)
  
  
      res.send({success:true, body:{rencontre: rencontre,message:"tournoi enregistré!!!"}})
      
    } catch (error) {
        console.error(error)
        
        res.send({success:false})

    }



  }else{
    res.send({success:false, message:"Renseigner tout les champs!!!"})
  } 


});


router.get("/getAll/:idTournoi", async (req,res,next)=>{

  let matchs = await Rencontre.findAll({where:{tournoiIdTournoi:req.params.idTournoi},order:[["idRencontre","DESC"]],raw:true})
    
  res.send({success:true,body:matchs})
 
   
 })

 router.get("/getOne/:idRencontre", async (req,res,next)=>{

  let match = await Rencontre.findOne({where:{idRencontre:req.params.idRencontre},raw:true})
    
  res.send({success:true,body:match})
 
   
 })
  

 router.post('/updateTime/:idMatch', async function(req, res, next) {

    let tempsDeJeu = req.body.tempsDeJeu

    let body = await Rencontre.update({tempsDeJeu},{where:{idRencontre:req.params.idMatch}})

    res.send(body)



 })

router.post('/update/:idMatch', async function(req, res, next) {
  
  if(req.body.idEquipe1 != undefined && req.body.idEquipe2 != undefined && req.body.lieuRencontre != undefined && req.body.dateRencontre != undefined && req.body.heureRencontre != undefined && req.body.categorieIdCategorie != undefined && req.body.sexe != undefined){

    let idEquipe1 = req.body.idEquipe1
    let idEquipe2 = req.body.idEquipe2
    let lieuRencontre= req.body.lieuRencontre
    let dateRencontre = req.body.dateRencontre
    let heureRencontre = req.body.heureRencontre
    let categorieIdCategorie = req.body.categorieIdCategorie
    let sexe = req.body.sexe
    let tournoiIdTournoi = req.params.idTournoi
    try {
      await Rencontre.update({idEquipe1, idEquipe2, lieuRencontre, dateRencontre, heureRencontre, categorieIdCategorie, sexe,tournoiIdTournoi},{where:{idRencontre:req.params.idMatch}})
      
    
  
      res.send({success:true, message:"changement effectué"})
      
    } catch (error) {
        console.error(error)
        
        res.send({success:false})

    }



  }else{
    res.send({success:false, message:"Renseigner tout les champs!!!"})
  } 


});

router.delete("/delete/:id", async (req,res,next)=>{

  await Rencontre.destroy({where: {idRencontre:req.params.id}})

  res.send({success:true, message:"Match supprimé!!"})

})

  // router.get("/getOne/:id",async (req,res,next)=>{

  //   let TournoiGet = await Tournoi.findOne({where: {idTournoi: req.params.id}})
  
  //     res.send({success:true, body:TournoiGet})
  
  // })



  // router.post('/update', async function(req, res, next) {
  
  //   if(req.body.nomTournoi != undefined && req.body.lieuTournoi!= undefined && req.body.dateDebut != undefined && req.body.dateFin != undefined && req.body.idTournoi != undefined){
  
  //     let nomTournoi = req.body.nomTournoi
  //     let lieuTournoi= req.body.lieuTournoi
  //     let dateDebut = req.body.dateDebut
  //     let dateFin = req.body.dateFin
     
  
  //     await Tournoi.update({nomTournoi, lieuTournoi, dateDebut, dateFin},{where:{
  //       idTournoi: req.body.idTournoi
  //     }})
  
  //     res.send({success:true, message:"Changement enregistré!!"})
  
  
  //   }else{
  
  //     res.send({success:false, message: "Veuillez renseigner tout les champs"})
  //   }
  
  
  // });
  



  // router.delete("/delete/:id", async (req,res,next)=>{

  //   await Tournoi.destroy({where: {idTournoi:req.params.id}})
  
  //   res.send({success:true, message:"Tournoi supprimé!!"})
  
  // })  

  
module.exports = router;
