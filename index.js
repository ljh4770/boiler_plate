const express = require('express')
const app = express()
const port= 5000

const bodyParser = require('body-parser');
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//apllication/json
app.use(bodyParser.json());

const config = require('./config/key');

const { User } = require("./models/User");

const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!, asdfasdf rererere'))

//save to DB informations needed for sign up taken by client
app.post('/register', (req, res) => {
      const user = new User(req.body)

      user.save((err, userInfo) => { 
        if(err) return res.json({success: false, err})
        return res.status(200).json({ 
          success: true
        })
      })
})
//.save: method from mongoDB
//status(200): sign of success

app.listen(port, () => console.log('Example app listening on port ${port}!'))
// ??? 실행시 포트 번호가 안보임 ${port}로 그대로 표시됨