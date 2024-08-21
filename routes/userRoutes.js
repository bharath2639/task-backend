const express = require('express');
const router = express.Router();
const { User, validate } = require('../model/User'); // Adjust the path if necessary
const bcrypt = require('bcrypt');

// Route for creating a new user
router.post('/signup', async (req, res) => {
 console.log(process.env.SALT);
 
    try {
        // Validate the request body
        console.log(req.body)
        const  {error}  = validate(req.body);
        
        
        if (error) return res.status(400).send({ message: error.details[0].message });

        // Check if a user with the given email already exists
        const user = await User.findOne({ email: req.body.email });
        console.log(user);
        
        
        
        if (user) return res.status(409).send({ message: "User with given email already exists!" });
        console.log(process.env.SALT);
        
        // Hash the password
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        console.log(hashPassword);
        console.log(salt);
        
        

        // Create and save the new user
        await new User({ ...req.body, password: hashPassword }).save();
        res.status(201).send({ message: "User created successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;
