const jwt = require('jsonwebtoken');
const User = require('../config/userschema');

//sesionnnnnnnnnnnnnnnnnnn
const session = require('express-session');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // json web token check cheyyaaaan
  if (token) {
    jwt.verify(token, 'shaheerz secret', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        if (req.session.user) {
          res.redirect('/admin');
        } else {
          res.redirect('/login');
        }
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    if (req.session.user) {
      res.redirect('/admin');
    } else {
      res.redirect('/login');
    }
  }
};

//checking logined user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, 'shaheerz secret', async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });

  } else {
    res.locals.user = null;
    next()
  }
}

module.exports = { requireAuth, checkUser };