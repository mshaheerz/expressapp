// const express = require('express');
// const { request, render } = require('../app');
// const router = express.Router();
// const User = require('../config/userschema');
// const jwt = require('jsonwebtoken');
// /* GET home page. */
// const handleErrors = (err) => {
//     console.log(err.message, err.code);
//     let errors = { email: '', password: '' };
  
//     // duplicate email error
//     if (err.code === 11000) {
//       errors.email = 'that email is already registered';
//       return errors;
//     }

//  // validation errors
//  if (err.message.includes('user validation failed')) {
//     // console.log(err);
//     Object.values(err.errors).forEach(({ properties }) => {
//       // console.log(val);
//       // console.log(properties);
//       errors[properties.path] = properties.message;
//     });
//   }
//   return errors;
// }

// // create json web token
// const maxAge = 3 * 24 * 60 * 60;
// const createToken = (id) => {
//   return jwt.sign({ id }, 'net ninja secret', {
//     expiresIn: maxAge
//   });
// };





// router.get('/',(req, res)=>{
//     res.render('userlogin');
// })

// router.post('/' ,async (req, res)=>{
//     const { email, password } = req.body;
//     console.log("aaaaaaaaaaaaaaaaaaa");

   

//   try {
//     const user = await User.login(email, password);
//     res.status(200).json({ user: user._id });
//   } catch (err) {
//     res.status(400).json({});
//   } 
// })

// module.exports = router;
