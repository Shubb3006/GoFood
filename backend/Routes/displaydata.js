const express=require("express");
const route=express.Router();

route.post("/fetchfooddata",(req,res)=>{
    try{    
        res.send([food_item,food_category])
    }catch(err)
    {
        console.error(err);
        return res.status(400).json({Error:"Internal error"})
    }
})

module.exports=route