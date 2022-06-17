var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/userModel');
var validationRules = require.main.require('./validation_rules/rules');
var asyncValidator = require('async-validator-2');

router.get('/', (req, res) => {
  res.render('login.ejs', { errs: [] });
});

router.post('/', (req, res) => {

  var data = {
    email: req.body.email,
    password: req.body.password
  };

  var rules = validationRules.users.login;
  var validator = new asyncValidator(rules);

  validator.validate(data, (errors, fields) => {
    if (!errors) {
      userModel.validateUser(req.body.email, req.body.password, function (result) {
        if (!result) {
          res.render('login', { errs: [{ message: 'Invalid email or password' }] });
        }
        else {
          for (var i = 0; i < result; i++) {
            
          }
          console.log(result);
          
          if (result[i].userRole == 'user') {
            req.session.customer = result[i].id;
            console.log("i should get the id " + req.session.customer)
            res.redirect('/customer/home');
          
          } else { 
            req.session.admin = result[i].id;
            res.redirect('/admin/home');
        
          }
        }
      });
    }
    else {
      console.log(fields);
      res.render('login', { errs: errors });
    }
  });

});

module.exports = router;
