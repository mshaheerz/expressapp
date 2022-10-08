const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    
    name:String,
    category:String,
    price:Number,
    description:String,
    image:String,
    admin:Boolean,

})
//ini ithine model aaakanam

const product = new mongoose.model('product',schema);
module.exports = product;