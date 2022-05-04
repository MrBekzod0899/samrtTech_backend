const { Router } = require("express");

const router=Router()

router.get('/',async(req,res)=>{
    res.render('page/project/project',{
        title:'Project',
        isProject:true
    })
})

module.exports=router