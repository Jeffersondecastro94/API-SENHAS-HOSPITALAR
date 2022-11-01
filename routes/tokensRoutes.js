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
  console.log(dateDay)
  try {
    const fullTokens = await Tokens.find(); //todos tokens

    const ordenados =fullTokens.filter(item=>{ // filtra a senha pelo id em comum e a data do dia
        return ((item.order ==2) && (item.date==dateDay));
        //datePattern
     //   return  (item.date==`"${dateDay}"`);
      })
      return res.status(200).json(ordenados);
  

  } catch (e) {
    console.log(e);
  }
});





router.get("/deleteAll", async (req, res) => {
  try {
    await Tokens.deleteMany();
    return res.status(200).json({});
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
