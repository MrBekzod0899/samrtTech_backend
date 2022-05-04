const {Schema,model}=require('mongoose')

const category=new Schema({
        title:String,
        Image:String,
        order:{
            type:Number,
            default:0
        },
        status:{
            type:Number,
            default:0
        }, 
})

module.exports=model('Category',category)