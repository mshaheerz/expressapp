const express = require('express');
const router = express.Router();
router.get('/', function(req, res, next) {
  res.cookie('jwt','',{maxAge:1});
  res.redirect('/');
  
});

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











// router.post('/', async (req, res)=> {

//     const { email,password}=req.body;
//     console.log(req.body);
   
//   try {
//     const user = await User.create({ email, password });
//     const token = createToken(user._id);
//     res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
//     res.status(201).json({ user: user._id });
//   }
//   catch(err) {
//     const errors = handleErrors(err);
//     res.status(400).json({ errors });
//   }

//     // users.create(req.body).then((users)=>{
//     //     res.redirect('/')
        
//     //   }).catch((error)=>{ 
//     //     res.status(400).send(error);
//     //   })
// });



// module.exports = router;
