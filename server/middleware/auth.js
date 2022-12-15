const { User } = require('../server/models/User');

let auth = (req, res, next) => {
  //인증처리를 하는 곳
  //get token from client cookie
  let token = req.cookies.x_auth;

  //decode token and find user
  User.findByToken(token, (err, user) => {
    if(err) throw err;
    if(!user) return res.json({ isAuth: false, error: true})

    req.token = token;
    req.user = user;
    next();
  })
  //if exist allow, else dont
}

module.exports = { auth };