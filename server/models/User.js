const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, //delete empty space
    },
    password: {
        type: String,
        minlength: 2
    },
    lastname: {
        type: String,
        maxlength: 50

    },
    role: {
        type: Number,
        defualt: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function( next ){
    var user = this;
    
    if (user.isModified('password')){
        //encrypting password
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err)
                user.password = hash;
                next()
            })
        })
    } else{
        next();
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb){
    //plain pw: test1         Encryted pw: "$2b$10$knMUhklcMOc8QOySX2EipOxA2cTmi2Vx83MldPVGocECinWOPT.Mm"
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err)
            cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb){
    var user = this;

    //generate web token bia jsonwebtoken
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    user.token = token;
    user.save(function(err, user){
        if(err) return cb(err);
        cb(null, user);
    })

}

userSchema.statics.findByToken = function(token, cb){
    var user = this;
    //decoding token
    jwt.verify(token, 'secretToken', function(err, decoded){
        //유저 아이디를 이용하여 유저를 찾은 후
        //클라이언트에서 가져온 token과 DB에 보과노딘 토큰이 일치하는지 확인
        user.findOne({"_id": decoded, "token": token}, function(err, user){
            if(err) return cb(err);
            cb(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }