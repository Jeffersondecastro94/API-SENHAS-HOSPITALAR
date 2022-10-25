//config inicial
const express=require(`express`) //importou
const mongoose=require('mongoose') // importado para conexao com o banco, tem os metodos de end point que vamos usar
const app=express()//inicializa, faz os end points funcionar
src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"
const moment = require('moment');
//console.log(moment().format('YYYYMMDD-'));






//forma de ler json//middleawares = recursos  sao executados entre as requisicoes e respostas
app.use(
    express.urlencoded({
        extended:true,
    }),

)
app.use(express.json())










//ROTAS DA API 
//POST
//TRAS AS ROTAS PARA O INDEX, PARA QUE FUNCIONE
const tokensRoutes=require('./routes/tokensRoutes')
app.use('/tokens',tokensRoutes) // END POINT QUE DO TOKEN ROUTES //E APÓS AS OUTRAS URL Q TAO EM TOKENS ROUTES 
//temos aq a rota main, e detro dela temos os end points com suas rotas




















//ENTREGAR UMA PORTA

const DB_USER='APISenhas' //USER do banco que foi criado
const DB_PASSWORD=encodeURIComponent('@Je123456')//SENHA do banco que foi criado

//mongodb+srv://APISenhas:<password>@apisenhas.clzwblu.mongodb.net/?retryWrites=true&w=majority\
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apisenhas.clzwblu.mongodb.net/servicespasswords?retryWrites=true&w=majority`)

.then(()=>{console.log('conectou ao banco')
app.listen(3000)                                            //disponibiliza o json aqui)
})

.catch((err)=>console.log(err))