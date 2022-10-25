//AQUI CRIAMOS O END POINT, E DEFIMOS SUA URL . PODENDO SER IGUAL E SO MUDANDO O VERBO. OU COLOCAR DIFERENTE


const moment = require('moment');
//console.log(moment().format('YYYYMMDD-'));
const router=require('express').Router()
const Tokens=require('../models/Tokens') //importa a tabela tokens

//rotas da api
                                        //POST http://localhost:3000/senha
                                        //     {
                                        //         "tokenPriority": "SG",
                                        //         "order": "01",
                                        //         "date": "2002/02/22"
                                        // }


//=======================================================================================================================================
//O BOTAO SERIA A ENTRADA Q O USUARIO VAI DAR , NO CASO SE ELE QUER SG , ST ,XX . O VALOR DO BOTAO 
//SERIA OQ VAMOS DIGITAR NA REQUISICAO DO POST , PRA TIPO DE PRIORIDADE
// O RESTO TEM Q RECEBER OS VALORES AUTOMATICAMENTE, A DATA E O INCREMENTO E A MENSAGEM DE SUCESSO SERA A SENHA


router.post('/registertoken',async (req,res)=>{
//req.body
const {tokenPriority,order,date}=req.body //desetrutura o body da requisicao 
//valida se o campo da requisicao foi
if(!tokenPriority){
    res.status(422).json({error: 'o campo precisa ser preenchido'})
}
//criar entidade no banco
//data do sistema
dateDay=moment().format('YYYYMMDD-')

//AQUI SAO OS VALORES QUE SAO INSERIDOS NO BANCO, SE EU NAO COLOCAR NADA ELE RECEBE O QUE FOR DIGITADO LA NO POST
const token={
tokenPriority,
order:20,
date:dateDay
}
 
try{

// console.log(req.tokenId)
//criando dados no banco mongo    
await Tokens.create(token)
console.log(token)
//res.status(201).json({message:'senha inserida no sistema',})
res.status(201).json({message:'SUA SENHA É:', "date":token.date,"tokenPriority":tokenPriority, "order":token.order})
console.log(`a sua senha é ${token.date}${tokenPriority}${token.order}`) //da pra usar os valores sem o token. pois foram desestruturados
//token.date >> ASSIM MOSTRAMOS O VALOR Q MANIPULAMOS AQUI.
//tokenPriority>> ASSIM MOSTRA O QUE DIGITAMOS DE IMPUT LA NA WEB


//AGORA TENHO Q FAZER A SENHA RECECER A SEQUENCIA E A DATA, E SO PASSAR A PRIORIDADE PELO POST

} catch(error){
    res.status(500).json({error:error})
}

})

//=======================================================================================================================================

                                                    //GET ALL http://localhost:3000/senha
                                                        //TODOS OS DADOS SENHAS
router.get('/fulltokens',async(req,res)=>{


    try{
        const fulltokens= await Tokens.find()
        res.status(200).json(fulltokens)
    
        

    }
    catch(error){

        res.status(500).json({error:error})
    }
})


//=======================================================================================================================================/
//PESQUISA POR ID
router.get('/:id', async (req, res) => {
    // extrair o dado da requisicao, pela url = req.params
    const id = req.params.id  // esse é o campo/id q digitamos no web
    
    try{
        //if (!tokens){

           // res.status(422).json({message: "Nao encontrado"})
       // }


        const token=await Tokens.findOne({_id:id}) //aq compara com o atributo _id do banco

        res.status(200).json(token) // se encontrar ele tras aq os dados relacionado a esse id e status ok
        //NESSE JSON PODEMOS TRAZER QUALQUER COISA, NO CASO TA RETORNANDO TODOS OS DADOS.
        //ENTAO EU POSSO JA TRAZER A SENHA FORMATADA HEHEHEHEH. SO TENHO Q VER COMO CONCATENA KK
    
    }catch(error){
        res.status(500).json({error:error}) //se der errado
    }
    
})

//=======================================================================================================================================/

//UPDATE PATCH ATUALIZA ALGO ESPECIFICO PUT ATUALIZA TUDO
router.patch('/:id',async(req,res)=>{ // TEM Q SER NA ORDEM REQ DEPOIS O RES

const id=req.params.id
const {tokenPriority,order,date}=req.body  //pega os dados da tabela referente ao id
const token={     //pega eles 
    tokenPriority,
    order,
    date,
    }
try{

    const updateToken=await Tokens.updateOne({_id:id},token) //nesse momento token ta recebendo novos valores 

    res.status(200).json(token)//aq mostramos os novos dados
}catch(error){
    res.status(500).json({error:error})
}

}
)

module.exports= router