const {Schema,model}=require('mongoose')

const slider=new Schema({
    Image:String,
    title:String,
    text:String,
    status:{
        type:Number,
        default:0
    }
})

module.exports=model('Slider',slider)