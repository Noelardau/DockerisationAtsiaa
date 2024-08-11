var express = require('express');
var router = express.Router();
var {Participer, Equipe, db} = require("../models/lrbbhm")

/* GET home page. */
router.post('/add', async function(req, res, next) {
  
  if(req.body.participants != undefined && req.body.tournoiIdTournoi != undefined){

    req.body.participants.forEach( p => {
        

      Participer.create({equipeIdEquipe:p.idEquipe, tournoiIdTournoi: req.body.tournoiIdTournoi})
    
    });




    res.send({success: true,  message: 'Inscription réussi!!' });

  }else{
  res.send({ message: 'Veuillez remplir les donnee requis' });

  }
  
});


router.get("/getAll/:idTournoi",async function (req, res, next){


  var [results] = await db.query("SELECT * FROM participer p JOIN equipe e ON p.equipeIdEquipe = e.idEquipe WHERE p.tournoiIdTournoi = ? ",{
    replacements:[req.params.idTournoi]
  });

  res.send({body:results})



})

router.post('/delete', async function(req, res, next) {
  
  if(req.body.equipeIdEquipe != undefined && req.body.tournoiIdTournoi != undefined){

    let equipeIdEquipe = req.body.equipeIdEquipe
    let tournoiIdTournoi = req.body.tournoiIdTournoi


    await Participer.destroy({where:{equipeIdEquipe, tournoiIdTournoi}})



    res.send({success: true,  message: 'Inscription annulé!!' });

  }else{
  res.send({ message: 'Veuillez remplir les donnee requis' });

  }
  
});

module.exports = router;
