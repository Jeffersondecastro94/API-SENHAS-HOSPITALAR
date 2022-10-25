const mongoose=require('mongoose')

const Tokens= mongoose.model('Tokens',{
    tokenPriority:String,
    order:Number,
    date:String
    
    //YYMMDD-PPSQ como vai ficar no get data-prioridade numero de sequencia

})

module.exports= Tokens