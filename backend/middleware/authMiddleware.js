const jwt = require("jsonwebtoken");

module.exports = (req,res,next)=>{
    const header = req.headers.authorization;
    if(!header) return res.json({error:"No token provided"});

    const token = header.split(" ")[1];

    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err) return res.json({error:"Invalid token"});

        req.user = user;
        next();
    });
}
