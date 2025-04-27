const express  =require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api" , require("./api"));

app.listen(8081,()=>{
  console.log("Listening...")  ;
})


