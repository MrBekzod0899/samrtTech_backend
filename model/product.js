const {Schema,model}=require('mongoose')

const product=new Schema({
    title:String,
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category'
    },
    price:Number,
    sale:Number,
    text:String,
    view:Number,
    review:[
        {
            name:String,
            cretedAt:{
                type:Date,
                default:Date.now()
            },
            mark:{
                type:Number,
                default:0
            },
            title:String,
            text:String
        }
    ],
    photos:[String],
})

module.exports=model('Product',product)