const moment = require("moment");

const router = require("express").Router();
const Tokens = require("../models/Tokens");
const priority = require("../models/tokenPriority");

let order = 1;

router.post("/registerToken", async (req, res) => {
  const { tokenPriority } = req.body;

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

    const token = {
      priority: tokenPriority,
      order: order++,
      date: dateDay,
    };

    await Tokens.create(token);

    console.log(`a sua senha é ${datePattern}-${token.priority}${token.order}`);

    return res.status(201).json({
      message: `SUA SENHA É: ${token.order}`,
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
    const fullTokens = await Tokens.find();
    const lastToken = fullTokens.find((token) => {
      token.order == order;
    });

    const listPriorityGeral = fullTokens.filter((token) => {
      return token.priority == priority.sg;
    });
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
