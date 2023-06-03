const express=require('express');

const router=express.Router();
const validateToken = require("../middlewares/validateToken");

function IsLoggedIn(req,res,next){
    console.log(req.user)
    req.user ? next():res.json("Unauthorized")
}
//router.post("/search",validateToken,searchHistoryController.searchHistoryController)
router.get("/",(req,res)=>{ res.render("Hi there ! Welcome!")});

module.exports= router