const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.register = async(req,res)=>{
    const {name,email,password} = req.body;

    const hashed = await bcrypt.hash(password,10);

    await User.createUser(name,email,hashed);

    res.json({message:"Account created successfully 🚀"});
};

exports.login = async(req,res)=>{
    const {email,password} = req.body;
    
    const [rows] = await User.findByEmail(email);

    if(rows.length===0) return res.json({error:"User not found"});

    const user = rows[0];

    const valid = await bcrypt.compare(password,user.password);

    if(!valid) return res.json({error:"Invalid password"});

    const token = jwt.sign(
        {id:user.id,email:user.email},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    );

    res.json({
        message:"Logged in!",
        token
    });
};
