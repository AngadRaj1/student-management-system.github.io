const express = require('express');
const router = express.Router();

const User = require('../model/userModel');
const auth = require('../middleware/auth');



///Register for user
router.post('/signup', (req, res) => {
    if(req.body.password!==req.body.cpassword){
        res.status(400).json({
            message:"Password not matched"
        })
    }else{
          const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({
            Success: false
        });
        res.status(200).json({
            user: doc
        });
    })
  }
});

///login///
router.post('/login',(req,res)=>{
    User.findOne({'email':req.body.email},(err,user)=>{
        if(!user) return res.json({
            auth:false,
            message:'Auth fails,email not found..!',
            userData:false
        });

        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch) return res.json({
                auth:false,
                message:'Wrong Password',
                userData:false
            });

            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);
                res.cookie('auth',user.token).json({
                    auth:true,
                    userData: {
                            id: user._id,
                            Email: user.email,
                            Name: user.name,
                            Mob_Number: user.mnumber,
                            Dob:user.dob,
                            Address:user.address,
                            Degree:user.degree,
                            Skills:user.skills,
                            Year_Experience:user.yearexperience
                    }
                })
            })
        })
    })
});

router.get('/auth', auth,(req, res) => {
    res.json({
        auth:true,
        userData:{
            id:req.user._id,
            email:req.user.email,
            name:req.user.name,
            lastname:req.user.lastname
        }
    })
});

router.get('/getUser',(req, res) => {
    User.find().exec((err,doc)=>{
        if(err) return res.status(400).send(err)
            res.json({
                userData:doc
            });
    })
})

router.get('/logout',auth,(req,res)=>{
    req.user.deleteToken(req.token,(err,user)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send('User logged Out..!');
        console.log("logged out");
    })
})

module.exports = router;