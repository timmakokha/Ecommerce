const {User} = require('../models/users');
const express= require('express');
const router = express.Router();

router.get(`/`, async (req,res)=>{
    const usersList = await User.find();
    
    if(!usersList) {
        res.status(500).json({success: false})
    }
        res.send(userList); 
    })

router.post('/', async (req,res)=>{
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            passwordHash: req.body.passwordHash,
            street: req.body.street,
            apartment: req.body.apartment,
            city: req.body.city,
            zip: req.body.zip,
            country: req.body.country,
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
        })
        user = await user.save();

        if(!user)
        return res.status(400).send( 'the user cannot be created')

        res.send(user);
    })
module.exports = router;