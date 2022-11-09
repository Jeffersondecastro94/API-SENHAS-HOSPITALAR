const moment = require("moment");

const router = require("express").Router();
const Tokens = require("../models/Tokens");
const priority = require("../models/tokenPriority");

dateDay = moment().format("DD/MM/YYYY");
datePattern = moment().format("YYYYMMDD");
let order = 1;
let ordertoken = 1;
let orderSP = 1;
let orderSG = 1;
let orderSE = 1;
let contt=1

router.post("/registerToken", async (req, res) => {

  
  const { tokenPriority } = req.body;  //UNICO DADO PASSADO PELA REQUISICAO DO POST (A SENHA DESEJADA QUE VAI VIRAR CADASTRO NO BANCO)
  
  if (!tokenPriority) {
    return res.status(422).json({ error: "o campo precisa ser preenchido" });
  }
  if (
    tokenPriority != priority.se &&
    tokenPriority != priority.sg &&
    tokenPriority != priority.sp
  ) {
    return res.status(406).json({ error: "o Token é invalido" });
  }

  try {
  
    dateDay = moment().format("DD/MM/YYYY");
    datePattern = moment().format("YYYYMMDD");
 
   //PARA QUE A ORDEM INTERCALE DEPENDENDO DA SENHA SOLICITADA , NAO SEGUINDO UMA ORDEM CRESCENTE UNICA ENTRE TODAS AS SENHAS
    if (tokenPriority=="SE"){
      order=orderSE++  
    }else if(tokenPriority=="SG"){
      order=orderSG++  
    }else if(tokenPriority=="SP"){
      order=orderSP++  
    };

    const token = {
      priority: tokenPriority,
      order: order,
      date: dateDay,
    };
    await Tokens.create(token);
    contt=1 // REINICIA A ITERACAO NA LISTA QUE TEM TODAS SENHAS A SER CHAMADA
    console.log(`a sua senha é ${datePattern}-${token.priority}${token.order}`);
    return res.status(201).json({
      message: `a sua senha é ${datePattern}-${token.priority}${token.order}`,
      date: token.date,
      priority: tokenPriority,
      order: token.order,
    });

    
  } catch (error) {
   
    res.status(500).json({ error: error });
  }
});




router.get("/fullTokens", async (req, res) => {
  try {
    const fullTokens = await Tokens.find();
    return res.status(200).json(fullTokens);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});



// let contt=1

router.get("/nextToken", async (req, res) => {
 
  try { //TRY PARA O GET
    const fullTokens = await Tokens.find(); //todos tokens
  
       //ESTOU FAZENDO A FUNCAO FORA E DEPOIS COLOCANDO NO FILTER
    const isPrioritySG = fullToken1 => fullToken1.priority === 'SG' && (fullToken1.date==dateDay);
    const isPrioritySP = fullToken1 => fullToken1.priority === 'SP' && (fullToken1.date==dateDay);
    const isPrioritySE = fullToken1 => fullToken1.priority === 'SE' && (fullToken1.date==dateDay);

    const senhasSG = fullTokens.filter(isPrioritySG);
    const senhasSP = fullTokens.filter(isPrioritySP);
    const senhasSE = fullTokens.filter(isPrioritySE);
    
    const senhasTotais= senhasSP.concat(senhasSE).concat(senhasSG)

    const senhaChamada=senhasTotais.find(senhafinal=>senhafinal.order===contt)

    
try{ //se conseguir deletar o numero da ordem setada pelo contador
  await senhaChamada.delete();} //DELETA A SENHA CHAMADA PARA QUE POSSA CONSULTAR A PROXIMA
catch (e) { //se nao conseguir deletar o o numero da ordem pois nao existe
  console.log(e);
 
 contt++
}

    return res.status(200).json(senhaChamada);// SE O FIND DE SENHASTOTAIS DER CERTO, AI ELE ENTRA NO DELETE, SE NAO, ELE ENTRA NO CATCH DO DELETE, ADCIONANDO +1 NO CONTADOR

  } catch (e) {//CASO DE ERRADO A O FIND DO TENKS DA ROTA
    console.log(e);
   
  }
});





router.delete("/deleteAll", async (req, res) => {
  try {

    orderSP = 1;
    orderSG = 1;
    orderSE = 1;

    await Tokens.deleteMany();
    return res.status(200).json({"deletados:":"deletados"});
  
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
