const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const products = require('../config/schema');
const { requireAuth }= require('../middleware/authMiddleware');

/* GET home page. */
router.get('/',requireAuth, function(req, res, next) {
  products.find({}).then((products)=>{
    res.render('user',{products});
  }).catch((err)=>{
     res.status(400).send(err);
  })
  
});

module.exports = router;
