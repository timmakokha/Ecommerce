const {Category} = require('../models/categories');
const express= require('express');
const router = express.Router();

router.get(`/`, async (req,res)=>{
    const categoryList = await Category.find();
    
    if(!categoryList) {
        res.status(500).json({success: false})
    }
        res.send(productList); 
    })

module.exports = router;