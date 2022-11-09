require("dotenv").config();
const app = require("./index");
const mongoose = require("mongoose");

const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)
const DB_USER=process.env.DB_USER

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apisenhas.clzwblu.mongodb.net/servicespasswords?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("conectou ao banco");
    app.listen(process.env.PORT || 3000);
   
  })
  .catch((err) => console.log(err));

  
