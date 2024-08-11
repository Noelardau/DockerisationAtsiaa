var express = require('express');
var router = express.Router();
const {Joueur,db} = require("../models/lrbbhm")
const {Op} = require("sequelize")




/* GET home page. */
router.post('/create', async function(req, res, next) {
  
  if(req.body.nomJoueur != undefined && req.body.prenomJoueur!= undefined && req.body.dateNaissance!= undefined && req.body.numeroMaillot != undefined && req.body.tel != undefined && req.body.CIN != undefined && req.body.equipeIdEquipe != undefined && req.body.categorieIdCategorie != undefined){

    let nomJoueur = req.body.nomJoueur
    let prenomJoueur = req.body.prenomJoueur
    let dateNaissance = req.body.dateNaissance
    let numeroMaillot = req.body.numeroMaillot
    let tel = req.body.tel
    let CIN = req.body.CIN
    let equipeIdEquipe = req.body.equipeIdEquipe
    let categorieIdCategorie= req.body.categorieIdCategorie
    let sexe = req.body.sexe


  let lastInserted  = await Joueur.create({nomJoueur, prenomJoueur, dateNaissance, numeroMaillot, tel, CIN, equipeIdEquipe, categorieIdCategorie, sexe})

    res.send({success:true, body:lastInserted})


  }else{

    res.send({success:false, message: "Veuillez renseigner tout les champs"})
  }


});

router.post('/update', async function(req, res, next) {
  
  if(req.body.nomJoueur != undefined && req.body.prenomJoueur!= undefined && req.body.dateNaissance!= undefined && req.body.numeroMaillot != undefined && req.body.tel != undefined && req.body.CIN != undefined && req.body.equipeIdEquipe != undefined && req.body.categorieIdCategorie != undefined){

    let nomJoueur = req.body.nomJoueur
    let prenomJoueur = req.body.prenomJoueur
    let dateNaissance = req.body.dateNaissance
    let numeroMaillot = req.body.numeroMaillot
    let tel = req.body.tel
    let CIN = req.body.CIN
    let equipeIdEquipe = req.body.equipeIdEquipe
    let categorieIdCategorie= req.body.categorieIdCategorie
    let sexe = req.body.sexe


    await Joueur.update({nomJoueur, prenomJoueur, dateNaissance, numeroMaillot, tel, CIN, equipeIdEquipe, categorieIdCategorie, sexe},{where:{
      idJoueur: req.body.idJoueur
    }})

    res.send({success:true, message:"Joueur enregistré!"})


  }else{

    res.send({success:false, message: "Veuillez renseigner tout les champs"})
  }


});



router.get("/getLast/", async (req,res,next)=>{

let joueurs = await Joueur.findAll({limit:5,order:[["idJoueur","DESC"]],raw:true})


joueurs.forEach(e=>{
  
  e.nomEquipe = ""
  
})

console.log(joueurs)

  res.send({success:true, body:joueurs})

})





router.delete("/delete/:id", async (req,res,next)=>{

  await Joueur.destroy({where: {idJoueur:req.params.id}})

  res.send({success:true, message:"Joueur supprimé!!"})

})


// getJoueur
router.get("/getByEquipe/:id",async (req,res,next)=>{

  let joueurEquipe = await Joueur.findAll({where: {equipeIdEquipe: req.params.id}})

    res.send({success:true, body:joueurEquipe})

})

router.post("/getByEquipeCategorie/", async (req, res, next)=>{

  if(req.body.equipeIdEquipe != undefined && req.body.categorieIdCategorie != undefined){
    let equipeIdEquipe = req.body.equipeIdEquipe
    let categorieIdCategorie = req.body.categorieIdCategorie

    let joueurEquipeCategorie = await Joueur.findAll({where:{equipeIdEquipe, categorieIdCategorie}})
    
    res.send({success:true, body:joueurEquipeCategorie})
  }else{
    res.send({success:false, message:"il y a un problème"})
  }

})


router.post("/getJoueurForMatch/", async (req,res)=>{
  let sexe = req.body.sexe
  let categorieIdCategorie =  req.body.categorieIdCategorie
  let equipeIdEquipe = req.body.equipeIdEquipe


  let playerToPlay = await Joueur.findAll({where:{sexe,categorieIdCategorie,equipeIdEquipe}})

  res.send({success:true, body: playerToPlay})


})


router.post("/getJoueurUpForMatch/", async (req,res)=>{
  let sexe = req.body.sexe  
  let categorieIdCategorie =  req.body.categorieIdCategorie

  let equipeIdEquipe = req.body.equipeIdEquipe


  let playerToPlay = await Joueur.findAll({where:{sexe,equipeIdEquipe, categorieIdCategorie: {
    [Op.not]: categorieIdCategorie
  }}})

  res.send({success:true, body: playerToPlay})

})


router.post("/getJoueurParticipant/",async (req,res)=>{

  
  let idRencontre = req.body.idRencontre
  var [results] = await db.query("SELECT * FROM statjoueur s JOIN joueur j ON s.joueurIdJoueur = j.idJoueur WHERE  s.rencontreIdRencontre = ? ",{
    replacements:[idRencontre]
  });

  res.send({success:true, body:results})

})

router.post("/search/", async (req, res)=>{
  let key = req.body.key

  var [results] = await db.query("SELECT * FROM joueur WHERE  prenomJoueur LIKE '%"+key+"%' OR nomJoueur LIKE '%"+key+"%' ");


  res.send({body:results})
})




module.exports = router;
