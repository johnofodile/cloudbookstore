const express=require("express");
const path = require("path");

const PORT = process.env.PORT || 5000;

const https=require("https");

const app=express();

const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("Frontend"));
app.use(express.json({ limit: '100MB' }));
const bettersqlite3=require('better-sqlite3');
const db = bettersqlite3('./Database/LibraryDB.sqlite3');



app.get("/",function(req,res){
   
res.sendFile(__dirname+ "/index.html");

console.log(__dirname);
});
   

app.use(express.json({ limit: '100MB' }));
   
  /*app.get("/screeningspage",function(req,res){
   
      res.sendFile(__dirname+ "/Frontend/html/screenings.html");
      
      console.log(__dirname);
         });
         */
         
         

app.listen(PORT,function(){
   console.log("listening on http://Localhost:" + PORT);
});


const login=require("./login.js");
login(app,db);

const setupRESTapi=require("./rest-api");
setupRESTapi(app,db);


