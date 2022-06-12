const session=require("express-session");



const passwordEncryptor=require("./passwordEncryptor.js");



const passwordField="password";







module.exports=function(app,db){
app.use(session({
    secret: 'someUnusualStringThatIsUniqueForThisProject',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto' },
   
  }));
  app.post("/api/login", (req,res)=>{
   
      req.body[passwordField]= passwordEncryptor(req.body[passwordField]);
    
      let statement=db.prepare(`
      SELECT * FROM user
      WHERE email = :email AND password = :password
    `);
   let result= statement.all(req.body)[0]|| { _error: "No such user."};
   delete result.password;
   if (!result._error) {
    req.session.user = result;
  }
   res.json(result);

  });
  app.get('/api/login', (req, res) => {
    
     
    
    res.json(req.session.user || { _error: 'Not logged in' });
  });
  app.delete('/api/login', (req, res) => {
    
    delete req.session.user;
    res.json({ success: 'logged out' });
  });

}



