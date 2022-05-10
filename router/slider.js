const {Router}=require('express')
const Slider = require('../model/slider')
const router=Router()
const upload=require('../middleware/file')


router.get('/',async(req,res)=>{
    const SliderItem=await Slider.find().lean()
    res.render('page/slider/slider',{
        isSlider:true,
        title:'Slider',
        SliderItem
    })
})

router.post('/',upload.single('Image'),async(req,res)=>{
    let {title,status,text}=req.body
    status=status || 0
    let Image='no photo'
    if(req.file){
        Image=req.file.path
    }
    let sliderData=await new Slider({title,status,text,Image})
    await sliderData.save()
    res.redirect('/slider')
})


router.get('/delete/:id',async(req,res)=>{
    let _id=req.params.id;
    await Slider.findOneAndDelete({_id})
    res.redirect('/slider')
    
})

router.get('/status/:id',async(req,res)=>{
    let _id=req.params.id
    let statusSlider=await Slider.findById(_id).lean()
    statusSlider.status=statusSlider.status==1 ? 0 : 1
    await Slider.findByIdAndUpdate(_id,statusSlider)
    res.redirect('/slider')
})


router.get('/get/:id',async(req,res)=>{
    let _id=req.params.id
    let editSlider=await Slider.findOne({_id}).lean()
    res.send(editSlider)
})

router.post('/save',upload.single('Image'),async(req,res)=>{
    let {_id,title,text,status}=req.body
    status=status || 0
    let Image;
    if(req.file){
        Image=req.file.path
    }
    let editSlider=await Slider.findByIdAndUpdate(_id,{title,text,status,Image})
    await editSlider.save()
    res.redirect('/slider')
})

module.exports=router