var express = require('express');
const { Db, ObjectId } = require('mongodb');
const session = require('express-session');
const router = express.Router();
const mongoose = require('mongoose');
const products = require('../config/schema');
const { requireAuth }= require('../middleware/authMiddleware');
const usr = require('../config/userschema')




router.get('/', function(req, res, next) {
  if(req.session.user){
  products.find({}).then((products)=>{
    res.render('admin',{products});
  }).catch((err)=>{
     res.status(400).send(err);
  })
}else{
  res.redirect('/adminlogin');
}
  
});


router.get('/products', function(req, res, next) {
  if(req.session.user){
  products.find({}).then((products)=>{
    res.render('admin/view-products',{products});
  }).catch((err)=>{
     res.status(400).send(err);
  })
}else{
  res.redirect('/adminlogin');

}
  
});

router.get('/add-product',(req,res)=>{
  res.render('admin/add-product')
})

router.post('/add-product',(req,res)=>{
  console.log(req.body);

products.create(req.body).then(()=>{
  
  res.redirect('/admin/products')
  
}).catch((err)=>{ 
  res.status(400).send(err);
})

})


router.get('/delete-product',(req,res)=>{
 console.log("hellow");

 products.deleteOne({_id:ObjectId(req.query.id)}).then((products)=>{
res.redirect('/admin/products');
 }).catch((err)=>{
  res.status(400).send(err)})
})


router.get('/delete-user',(req,res)=>{
  console.log("hellow");
 
  usr.deleteOne({_id:ObjectId(req.query.id)}).then((usr)=>{
 res.redirect('/admin/view-users');
  }).catch((err)=>{
   res.status(400).send(err)})
 })



router.get('/view-users', (req,res)=>{
  usr.find({}).then((usr)=>{
    res.render('view-user',{usr});
  }).catch((err)=>{
     res.status(400).send(err);
  })

});


router.post('/update-product',(req,res)=>{
  
  products.updateOne({_id:ObjectId(req.body.id)},{$set:{
    name:req.body.name,
    description:req.body.description,
    price:req.body.price,
    category:req.body.category,
    image:req.body.image
  }}).then(()=>{
    res.redirect('/admin/products')
  }).catch((err)=>{
    res.status(400).send(err)
  })
})

router.post('/update-user',(req,res)=>{
  
  usr.updateOne({_id:ObjectId(req.body.id)},{$set:{
    name:req.body.name,
  
    email:req.body.email
    
  }}).then(()=>{
    res.redirect('/admin/view-users')
  }).catch((err)=>{
    res.status(400).send(err)
  })
})

router.post('/search',(req,res)=>{
 const name=req.body.serch;
 console.log(name);
 if(name===''){
  res.redirect('/admin/view-users');

 }else{
usr.find({$or:[{name:name},{email:name}]}).then((usr)=>{
    res.render('view-user',{usr});
  }).catch((err)=>{
    res.status(400).send(err)
  })
}
})
router.get('/adduser', (req, res)=>{
  res.render('admin/adduser');
});


module.exports = router;
