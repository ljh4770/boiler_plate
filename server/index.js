const express = require('express');
const app = express();
const port= 5000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const { auth } = require('./middleware/auth');

const { User } = require("./models/User");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//apllication/json
app.use(bodyParser.json());

app.use(cookieParser());

/*
//@issue@ postman sending foever
app.use(express.json({ extended: false }));
*/

const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!, asdfasdf rererere'))

//save to DB informations needed for sign up taken by client
app.post('/api/users/register', (req, res) => {
  const user = new User(req.body)

  user.save((err, userInfo) => { 
    if (err) return res.json({ success: false, err })
    return res.status(200).json({ 
      success: true
    })
  })
})
//.save: method from mongoDB
//status(200): sign of success

app.post('/api/users/login', (req, res) => {
  //check DB if requested email is in DB.
  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user){
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
    //if email exist, check if password is right.\
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
       return res.json({loginSucces: false, message: "비밀번호가 틀렸습니다."})
      //if password match, create token.
      user.generateToken((err,user) => {"jh47@"
        if(err) return res.status(400).send(err); //status(400): sign of err
          //saving token(ex: cookie, local, session)
          //cookie
          res.cookie("x-auth", user.token)
          .status(200)
          .json({loginSucces: true, userId: user._id})
      }) 
    })
  })
})

app.get('/api/users/auth', auth, (req, res) => {
  //여기까지 미들웨어가 통과해 왔다는 얘기는 Authentication이 true라는 말.
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })


})
//role이 0이 아니면 관리자

app.get('/api/users/logout', auth, (req, res) =>{
  User.findOneAndUpdate({ _id: req.user._id},
    { token: ""}
    , (err, user) => {
      if (err) return res.json({ success: false, err});
      return res.status(200).send({
        success: true
      })
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))