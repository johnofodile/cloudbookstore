const req = require("express/lib/request");
const passwordEncryptor=require("./passwordEncryptor");


const userTable="user";
const passwordField = "password";
const userRoleField = 'userRole';
let db;


function runQuery(tableName, req, res, parameters, sqlForPreparedStatement, isone = false) {
  
  let results;

  try {
    let stmt = db.prepare(sqlForPreparedStatement);
    //if query starts with select then use All
    // else use the run method

    let method = sqlForPreparedStatement.trim().toLowerCase().indexOf('select') === 0 ?
      'all' : 'run';
    results = stmt[method](parameters);

  }
  catch (error) {
    
    results = { _error: error + '' };

  }

  if (isone) {


    results = results[0];


  }
  results = results || null;
  res.status(results ? (results._error ? 500 : 200) : 404);
  res.json(results);

}




module.exports=function setupRESTapi(app, databaseConnection){
  db=databaseConnection;
  let tablesAndViews = db.prepare(`
  SELECT name, type 
  FROM sqlite_schema
  WHERE 
    (type = 'table' OR type = 'view') 
    AND name NOT LIKE 'sqlite_%'
`).all();

    app.get('/api/tablesAndViews',(req,res)=>{
        res.json(tablesAndViews);

    });
  
  
    for (let { name, type } of tablesAndViews) {

      app.get('/api/' + name, (req, res) => {
          
        runQuery(name, req,res, {}, `
        
        SELECT *
        FROM ${name}
        
        `);

        });
        
       
        
// to get a single post from a table based on its id 
      app.get('/api/' + name + '/:id', (req, res) => {
          
        runQuery(name,req, res, req.params, `
        SELECT * 
        FROM ${name}
        WHERE id = :id
        
        `, true);
      });
      
// dont add post, Put or Delete route to the views 
      if (type === 'view') {
        continue;
      }

// add a post route to the table
      
      app.post('/api/' + name, (req, res) => {
       
        // ids should not be manually set
        //delete req.body.id
      
      //   runQuery(res, req.body, `
      //   INSERT INTO ${name} (${Object.keys(req.body)})
      //   VALUES (${Object.keys(req.body).map(x => ':' + x)})

      //   `)
        delete req.body.id;
        
      if(name==userTable){
         req.body[passwordField] = passwordEncryptor(req.body[passwordField]);
        
        // this one will manually add a new user to the userRole user. 
        req.body[userRoleField] = 'user';
        }
      
        runQuery(name, req, res, req.body, `
        INSERT INTO ${name} (${Object.keys(req.body)})
        VALUES (${Object.keys(req.body).map(x => ':' + x)})
      `);
      });

      let putAndPatch = (req, res) => {

      
        if (name === userTable && req.body[passwordField]) {
         
          req.body[passwordField] =
            passwordEncryptor(req.body[passwordField]);
        }

        delete req.body[userRoleField];

        runQuery(name, req, res, { ...req.body, ...req.params }, `
        UPDATE ${name}
        SET ${Object.keys(req.body).map(x => x + ' = :' + x)}
        WHERE id = :id
      `);
      };
    

      app.put('/api/' + name + '/:id', putAndPatch);
      app.patch('/api/' + name + '/:id', putAndPatch);

    // App delete routes
    app.delete('/api/' + name + '/:id', (req, res) => {
      runQuery(name, req, res, req.params, `
        DELETE FROM ${name}
        WHERE id = :id
      `);
    });

  }
  

  // adding 404 route to the api
  // if no other routes match then we will get to this part last
  app.all('/api/*', (req, res) => {
    res.status(404);
    res.json({ _error: 'No such route!' });
  });

  // catch invalid JSON syntax in request bodies
  // should run for every query 
  
  app.use((error, req, res, next) => {
    if (error) {
      let result = {
        _error: error + ''
      };
      res.json(result);
    }
    else {
      // calling next will say "this middleware will not handle the response"
      next();
    }
  });

}




     
