const mongoose=require('mongoose')

const Tokens= mongoose.model('Tokens',{
    priority:String,
    order:Number,
    date:String
})

module.exports= Tokens