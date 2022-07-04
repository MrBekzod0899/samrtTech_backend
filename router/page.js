const { Router } = require("express");

const router=Router()

router.get('/',async(req,res)=>{
    res.render('index',{
        title:'Smart Technology',
        isHome:true,
        layout:'admin'
    })
})

module.exports=router