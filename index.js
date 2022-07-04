const express=require('express')
const app=express()
const mainHbs=require('express-handlebars')
const mongoose=require('mongoose')
const session=require('express-session')
const flash=require('connect-flash')
const csrf=require('csurf')
const varMid=require('./middleware/var')
const MongoStore=require('connect-mongodb-session')(session)
const cors=require('cors')

const hbs=mainHbs.create({
    defaultLayout:'admin/main',
    extname:'hbs'
})

app.engine('hbs',hbs.engine)
app.set('view engine','hbs')
app.set('views','views')


app.use(express.urlencoded({extended:true}))
app.use(express.static('node_modules'))
app.use(express.static('public'))
app.use('/uploads',express.static('uploads'))
app.use(cors())

const mongoURL='mongodb://127.0.0.1:27017/smarttech'
const store=MongoStore({
    collection:'session',
    uri:mongoURL
})

app.use(session({
    secret:'Maxfiy raqam',
    saveUninitialized:false,
    cookie:{
        maxAge:1000*60*60*10,
        secure:false
    },
    resave:true,
    store
}))

app.use(csrf())
app.use(flash())
app.use(varMid)

let routerList=require('./router')
app.use(routerList)
const PORT=5000
async function dev(){
    try{
        await mongoose.connect(mongoURL,{
            useNewUrlParser:true
        })
        app.listen(PORT,()=>{
            console.log(`server is running on ${PORT}`)
        })
    }
    catch(error){
         console.log(error)
    }
}
dev()