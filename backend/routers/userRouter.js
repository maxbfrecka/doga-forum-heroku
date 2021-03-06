const {BasicStrategy} = require('passport-http');
const express = require('express');
const jsonParser = require('body-parser').json();
const passport = require('passport');

const {User} = require('../models/userModel');

const router = express.Router();

router.use(jsonParser);

const strategy = new BasicStrategy(
  (username, password, cb) => {
  	console.log('in strategy')
    User
      .findOne({username})
      .exec()
      .then(user => {
        if (!user) {
          return cb(null, false, {
            message: 'Incorrect username'
          });
        }
        if (user.password !== password) {
          return cb(null, false, 'Incorrect password');
        }
        return cb(null, user);
      })
      .catch(err => cb(err))
});


passport.use(strategy);

router.post('/signUp', (req, res) => {
	console.log("RECEIVED POST REQUEST!")
  if (!req.body) {
    return res.status(400).json({message: 'No request body'});
  }

  if (!('username' in req.body)) {
    return res.status(422).json({message: 'Missing field: username'});
  }

  let {username, password, firstName, lastName} = req.body;

  if (typeof username !== 'string') {
    return res.status(422).json({message: 'Incorrect field type: username'});
  }

  username = username.trim();

  if (username === '') {
    return res.status(422).json({message: 'Incorrect field length: username'});
  }

  if (!(password)) {
    return res.status(422).json({message: 'Missing field: password'});
  }

  if (typeof password !== 'string') {
    return res.status(422).json({message: 'Incorrect field type: password'});
  }

  password = password.trim();

  if (password === '') {
    return res.status(422).json({message: 'Incorrect field length: password'});
  }

  // check for existing user
  return User
    .find({username})
    .count()
    .exec()
    .then(count => {
      if (count > 0) {
        return res.status(422).json({message: 'username already taken'});
      }
      // if no existing user, hash password
      return User.hashPassword(password)
    })
    .then(hash => {
      return User
        .create({
          username: username,
          password: hash,
          firstName: firstName,
          lastName: lastName
        })
    })
    .then(user => {
      return res.status(201).json(user.apiRepr());
    })
    .catch(err => {
      res.status(500).json({message: 'Internal server error'})
    });
});

// never expose all your users like below in a prod application
// we're just doing this so we have a quick way to see
// if we're creating users. keep in mind, you can also
// verify this in the Mongo shell.
router.get('/', (req, res) => {
  return User
    .find()
    .exec()
    .then(users => res.json(users.map(user => user.apiRepr())))
    .catch(err => console.log(err) && res.status(500).json({message: 'Internal server error'}));
});


// NB: at time of writing, passport uses callbacks, not promises
const basicStrategy = new BasicStrategy(function(username, password, callback) {
  console.log('in basicStrategy')
  let user;
  User
    .findOne({username: username})
    .exec()
    .then(_user => {
    	if (!_user){
    		return callback(null, false, {message: 'Incorrect username'});
    	}
      user = _user;
      if (!user) {
        return callback(null, false, {message: 'Incorrect username'});
      }
      return user.validatePassword(password);
    })
    .then(isValid => {
      if (!isValid) {
        return callback(null, false, {message: 'Incorrect password'});
      }
      else {
        return callback(null, user)
      }
    });
});


passport.use(basicStrategy);
router.use(passport.initialize());

/*passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
})*/

router.post('/signIn',
  passport.authenticate('basic', {session: false}),
  (req, res) => {
  	console.log('sign In is firing')
  	console.log(req.body)
  	res.json({user: req.user.apiRepr()})
  }
);



/*passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});*/
/*router.post('/signIn', (req, res, next) => {
	console.log('attempt')
  passport.authenticate('basic', function(err, user, info){
  	console.log('attempting')
    if(err){ 
    	console.log('err 1')
    	return console.log(err)
    }
    if(!user){
    	console.log('err 2')
      res.set('WWW-Authenticate', 'x'+info);
      return res.sendStatus(401);
    }
    req.login(user, function(err){
    	console.log('err 3')
      if(err) {
      	console.log('err 4')
      	return console.log(err)
      }
      console.log('err 5')
      res.redirect('/')
    })
    console.log('err 6')
  })(res,res, function(){
  	console.log('sign In is firing')
  	console.log(req.body)
  	res.json({user: req.user.apiRepr()})
  })
})*/

router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

module.exports = {router};
