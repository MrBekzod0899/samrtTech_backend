const {Router}=require('express')
const router=Router()
const Category=require('../model/category')
const upload=require('../middleware/file')
const auth =require('../middleware/auth')

router.get('/',async(req,res)=>{
    let categories=await Category.find().lean()
    categories=categories.map(category=>{
        category.status===1 ?
        category.status=`<span class="badge badge-pill badge-success">faol</span>`
        : category.status=`<span class="badge badge-pill badge-danger">no faol</span>`
    return category
})
    res.render('page/category/category',{
        isCategory:true,
        title:'Category',
        categories
    })
})

router.post('/',upload.single('Image'),async(req,res)=>{
    let {title,order,status}=req.body
    status=status || 0
    let Image='no photo'
    if(req.file){
        Image=req.file.path
    }
    let newCategory=await new Category({title,order,status,Image})
    await newCategory.save()
    res.redirect('/category')
})


router.get('/delete/:id',async(req,res)=>{
    let _id=req.params;
    console.log(_id)
    await Category.findOneAndDelete(_id)
    res.redirect('/category')
    
})

router.get('/get/:id',async(req,res)=>{
    console.log(req.params)
})

router.post('/save',upload.single('Image'),async(req,res)=>{
    let {_id,title,order,status}=req.body
    status=status || 0
    let Image;
    if(req.file){
        Image=req.file.path
    }
    let editCategory=await Category.findByIdAndUpdate(_id,{title,order,status,Image})
    await editCategory.save()
    res.redirect('/category')
})


module.exports=router