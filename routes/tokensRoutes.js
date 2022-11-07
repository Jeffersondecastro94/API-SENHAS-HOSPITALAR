const moment = require("moment");

const router = require("express").Router();
const Tokens = require("../models/Tokens");
const priority = require("../models/tokenPriority");


dateDay = moment().format("DD/MM/YYYY");
datePattern = moment().format("YYYYMMDD");
let order = 1;
let orderSP = 1;
let orderSG = 1;
let orderSE = 1;

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
      // order: order++,
      date: dateDay,
    };
    await Tokens.create(token);
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





router.get("/nextToken", async (req, res) => {

  try {
    const fullTokens = await Tokens.find(); //todos tokens

    //const senhaAtual= fullTokens.filter(senhadavez=> {senhadavez.priority==='SP'&& senhadavez.date==dateDay})
   // const senhaAtual= fullTokens.filter(senhadavez=> {if(senhadavez.priority==='SP' && senhadavez.date==dateDay && senhadavez.order == 1) {
   //   return senhadavez

   // }})
   // console.log(senhaAtual)



   //ESTOU FAZENDO A FUNCAO FORA E DEPOIS COLOCANDO NO FILTER
    const isPrioritySG = fullToken1 => fullToken1.priority === 'SG' && (fullToken1.date==dateDay);
    const isPrioritySP = fullToken1 => fullToken1.priority === 'SP' && (fullToken1.date==dateDay);
    const isPrioritySE = fullToken1 => fullToken1.priority === 'SE' && (fullToken1.date==dateDay);

    const senhasSG = fullTokens.filter(isPrioritySG);
    const senhasSP = fullTokens.filter(isPrioritySP);
    const senhasSE = fullTokens.filter(isPrioritySE);
    

    // const ordenados =fullTokens.filter(item=>{ 
   //     return ((item.order ==2) && (item.date==dateDay));
      
   //   })
 
    
    return res.status(200).json(senhasSP);
    
    
   
    //console.log(senhasSE);

   // if (senhasSP.order <senhasSE.order && senhasSP<senhasSG){
    //  return res.status(200).json(senhasSP);

   // }

   // const ordenados =fullTokens.filter(item=>{ // filtra a senha pelo id em comum e a data do dia
   //     return ((item.order ==2) && (item.date==dateDay));
      
   //   })
      
   

  } catch (e) {
    console.log(e);
  }
});





router.delete("/deleteAll", async (req, res) => {
  try {
    await Tokens.deleteMany();
    return res.status(200).json({"deletados:":"deletados"});
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
