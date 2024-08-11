var express = require('express');
var router = express.Router();
const {Coach} = require("../models/lrbbhm")


router.post('/create', function(req, res, next) {

    
      Coach.create(req.body)
    res.send({success:true, message:"Coach ajoutée!!"})

  });
  

  router.delete("/delete/:id",(req,res,next)=>{

    const idToDelete = req.params.id
  
    Coach.destroy({where:{idCoach:idToDelete}})
  
    res.send({success:true, message:"Suppression effectuée!!"}) 
    
  })
  
  
  router.post("/update/",(req,res,next)=>{

    
  
      
      
      try{

      
      Coach.update(req.body,{where:{idCoach:req.body.idCoach}})
      
      res.send({success:true, message:"modificaton enregistrée!!"}) 
    }catch(e){
      res.send("heyeiueyiueyfiyuif")
    }
  
    
  })


router.get("/getAll/", async (req,res,next)=>{
 
    const coachs = await Coach.findAll()
  
    res.send({success:true, body: coachs})
  
    

})

module.exports = router;
