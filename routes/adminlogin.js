var express = require('express');
const session = require('express-session');
const app = require('../app');
const { response, render } = require('../app');
var router = express.Router();


router.get('/', function (req, res, next) {
  if (req.session.user) {

    res.redirect('/admin');
  } else {
    res.render('adminlogin');
  }
});


//logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/adminlogin');
});



//validation
router.post('/', function (req, res) {
  const dbuser = 'admin@gmail.com';
  const dbpass = '12345678';

  const { email, password } = req.body;
  if (email === dbuser && password === dbpass) {
    //session makes true
    req.session.user = true;
    res.redirect('/admin');


  } else if (email == "" || password == "") {
    if (email === "" && password === "") {
      res.render('adminlogin', { title: 'login', usrerr: 'required', passerr: 'required' });
    } else if (email == "") {
      res.render('adminlogin', { title: 'login', usrerr: 'required' });
    } else if (password == "") {
      res.render('adminlogin', { title: 'login', passerr: 'required' });
    }
  } else if (email != dbuser || password != dbpass) {
    res.render('adminlogin', { title: 'login', err: 'Invalid username or password' });
  } else {
    res.redirect('/adminlogin');
  }

});


module.exports = router;
