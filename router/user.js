const {Router}=require('express')
const router =Router()
const User=require('../model/user')
const bcrypt = require('bcryptjs')


router.get('/login',async(req,res)=>{
    res.render('users/login',{
            layout:'user/main',
            isAuthed:false,
            title:'Login'
        }
    )
})

router.post('/login',async(req,res)=>{
    let {username,password}=req.body
    console.log(req.body)
    let checkUser=await User.findOne({username}).lean()
    if(checkUser){
        let compressPassword=await bcrypt.compare(password,checkUser.password)
        if(compressPassword){
            req.flash('success','Tizimga xush kelibsiz')
            req.session.user={
                _id:checkUser._id,
                username:checkUser.username,
                name:checkUser.name,
                email:checkUser.email
            }
            req.session.isAuthed=true
            req.session.save(err=>{
                if(err) throw new Error(err)
                else{
                    res.redirect('/')
                }
            })
        }
        else{
            req.flash('error','Your password is invalid')
            res.redirect('/user/login')
        }
    }
    else{
        req.flash('error','bunday logindagi username mavjud emas')
        res.redirect('/user/login')
        
    }

})

router.get('/register',async(req,res)=>{
    res.render('users/register',{
            layout:'user/main',
            isAuthed:false,
            title:'Register'
        }
    )
})
router.get('/logout',async(req,res)=>{
    res.redirect('/')
})

router.post('/register',async(req,res)=>{
    const {name,email,password,username}=req.body
    let checkUser=await User.findOne({username}).lean()
    if(checkUser){
        req.flash('error','bunday usernamedagi foydalanuvchi mavjud')
        res.redirect('/user/register')
    }
    else{
        let hashpassword=await bcrypt.hash(password,10);
        const newUser=await new User({email,name,username,password:hashpassword})
        await newUser.save()
        req.flash('success','Siz muvafaqqiyatli ro`yxatdan o`tdingiz ')
        res.redirect('/user/login')
    }
})

module.exports=router