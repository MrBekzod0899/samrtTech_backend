const {Schema,model}=require('mongoose')

const user=new Schema({
    name:String,
    username:String,
    password:String,
    photo:String,
    email:String,
    age:{
        type:Number,
        max:150,
        min:0
    },
    gender:{
        type:String,
        enum:['MALE','FEMALE']
    },
    role:{
        type:String,
        enum:['User','Admin'],
        default:'User'
    }

})

module.exports=model('User',user)