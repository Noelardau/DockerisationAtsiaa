var express = require('express');
var router = express.Router();
const {Categorie} = require("../models/lrbbhm")


router.post('/create', function(req, res, next) {

  

  

    const categorie = req.body.categorie
    
    if(categorie){
    
      Categorie.create({categorie})
    res.send({success:true, message:"Categorie ajoutée!!"})
   }else{
    
     res.send({success:false, message:"veuillez envoyer le nom de la categorie!!!"})
    }
  
    
    
    
    
  });
  

  router.get("/delete/:id",(req,res,next)=>{

    const idToDelete = req.params.id
  
    Categorie.destroy({where:{idCategorie:idToDelete}})
  
    res.send({success:true, message:"Suppression effectuée!!"}) 
    
  })
  
  
  router.post("/update/",(req,res,next)=>{

    
    if(req.body.categorie){
      
      const categorie = req.body.categorie
      const idToUpdate = req.body.idCategorie
      
      
      Categorie.update({categorie},{where:{idCategorie:idToUpdate}})
      
      res.send({success:true, message:"modificaton enregistrée!!"}) 
    }else{
      res.send({success:false, message:"Veuillez envoyer la categorie"})
    }
    
  })


router.get("/getAll/", async (req,res,next)=>{
 
    const categories = await Categorie.findAll()
  
    res.send({success:true, body: categories})
  
    

})

module.exports = router;
