const {Router}=require('express')
const router=Router()

router.get('/',async(req,res)=>{
    res.render('page/attribute/attribute',{
        title:'Attribute',
        isAttribute:true
    })
})

module.exports=router