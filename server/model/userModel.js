const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config').get(process.env.NODE_ENV);
const SALT_I = 10;


const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlenght: 100,
        required:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:1,
    },
    mnumber:{
        type:String,
        maxlenght:10,
        minlength:10,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    address:{
        type:String,
        maxlenght:150
    },
    degree:{
        type:String,
        maxlenght:100
    },
   skills: [{type:String}],
    yearexperience:{
        type:Number,
        maxlenght:10
    },
    password:{
        type:String,
        required:true,
        minlenght:6
    },
    cpassword:{
        type:String,
        required:true,
        minlenght:6
    } ,
    token:{
        type:String
    }  
});

userSchema.pre('save',function(next){
    var user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(SALT_I,function(err,salt){
            if(err) return next(err);

            bcrypt.hash(user.password,salt,function(err,hash){
                if(err) return next(err);
                user.password=hash;
                next();
            })
        })
    }else{
        next();
    }
});

userSchema.methods.comparePassword = function(candidatePassword,cb){
    var user = this;

    bcrypt.compare(candidatePassword,user.password,function(err,isMatch){
        if(err) return cb(err);
        cb(null,isMatch);
    });
}

userSchema.methods.generateToken = function(cb){
    var user = this;
    var token = jwt.sign(user._id.toHexString(),config.SECRET);

    user.token = token;
    user.save(function(err,user){
        if(err) return cb(err);
        cb(null,user);
    })
}

userSchema.statics.findByToken = function(token,cb){
    var user = this;

    jwt.verify(token,config.SECRET, function(err,decode){
        user.findOne({"_id":decode, "token":token} , function(err,user){
            if(err) return cb(err);
            cb(null,user);
        })
    })
};

userSchema.methods.deleteToken = function(token, cb){
    var user = this;
    user.updateOne({$unset:{token: 1}},(err,user)=>{
        if(err) return cb(err);
        cb(null,user);
    })
}

const User = mongoose.model('User',userSchema)
module.exports = User