const { Router } = require("express");

const router=Router()

router.get('/',async(req,res)=>{
    res.render('page/settings/settings',{
        title:'Settings',
        isSetting:true
    })
})

module.exports=router