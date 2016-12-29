'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const path = require('path')
const multer = require('multer')
const upload = multer({ dest: __dirname+'/backend/file-system/artists'})
const fs = require('fs')
const morgan = require('morgan')
const multiparty = require('multiparty')
const passport = require('passport')
const {BasicStrategy} = require('passport-http')
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs')
const flash = require('connect-flash')
const session = require('express-session')
const expressValidator = require('express-validator')
const dotenv = require('dotenv').config()
const AWS = require('aws-sdk')
//set up database
mongoose.Promise = global.Promise;
const {PORT, DATABASE_URL} = require('./backend/config')
const {User} = require('./backend/models/userModel')
const {Artist} = require('./backend/models/artistModel')
const {Album} = require('./backend/models/albumModel')
const {Track} = require('./backend/models/trackModel')
//file upload
const multipart = require('connect-multiparty')
const multipartyMiddleware = multipart()
// file upload
createArtist = require('./backend/uploaders/createArtist')
createAlbum = require('./backend/uploaders/createAlbum')
createTrack = require('./backend/uploaders/createTrack')
createUser = require('./backend/uploaders/createUser')


const app = express()
//logging
app.use(morgan('common'))
app.use(express.static(__dirname+'/app/'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false })) //dunno what this does
app.use(cookieParser())


// User System
/*// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));
// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
// Connect Flash
app.use(flash());
// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});*/
//Router to Users
const {router: usersRouter} = require('./backend/routers/userRouter');
app.use('/api/users/', usersRouter);




//return one artist
app.get('/api/artists/:artistName', (req, res) => {
  Artist
    .findOne({artistName: req.params.artistName})
    .exec()
    .then(artist =>res.json(artist.apiRepr()))
    .catch(err => {
      console.error(err);
        res.status(500).json({message: 'WE DONE GOOFED - SORRY'})
    });
});
//should query TRACKS database for tracks
app.get('/api/tracks/:albumArtist/:albumName', (req, res) => {
  Track
    .find({trackAlbum: req.params.albumName, trackArtist: req.params.albumArtist})
    .sort({trackNumber: +1})
    .exec()
    .then(track =>res.json(track))
    .catch(err => {
      console.error(err);
        res.status(500).json({message: 'WE DONE GOOFED - SORRY'})
    });
});
//gets albums for artist
app.get('/api/albums/:artistName', (req, res) => {
  Album
    .find({albumArtist: req.params.artistName})
    .exec()
    .then(album =>res.json(album))
    .catch(err => {
      console.error(err);
        res.status(500).json({message: 'WE DONE GOOFED - SORRY'})
    });
});
//gets specific album
app.get('/api/albums/:artistName/:albumName', (req, res) => {
  Album
    .find({albumName: req.params.albumName})
    .exec()
    .then(albums =>{
      res.json({
        albums: albums.map(
          (album) => album.apiRepr())
      });
    })
    .catch(err => {
      console.error(err);
        res.status(500).json({message: 'WE DONE GOOFED - SORRY'})
    });
});
//adds album folder, adds album to database onto artist, adds cover art
app.post('/api/createAlbum', multipartyMiddleware, createAlbum.uploadFile)
//add track to database and save to file system
app.post('/api/createTrack', multipartyMiddleware, createTrack.uploadFile)
//uploads image file, create folders
app.post('/api/createArtist', multipartyMiddleware, createArtist.uploadFile)
//get artists for page
app.get('/api/getArtists', (req, res) => {
  Artist
    .find()
    //can limit
    .limit(40)
    // `exec` returns a promise
    .exec()
    // success callback: for each restaurant we got back, we'll
    // call the `.apiRepr` instance method we've created in
    // models.js in order to only expose the data we want the API return.
    .then(artists => {
      res.json({
        artists: artists.map(
          (artist) => artist.apiRepr())
      });
    })
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: 'WE DONE GOOFED - SORRY'});
    });
});

//serves the HTML file
//may need to try to get a stronger grasp on the static files thing
//ensures that CSS stylesheet is added
app.use('/*', express.static(__dirname + '/app/assets/' ));
//adds bootstrap CSS
app.use('/*', express.static(__dirname + '/app/bower_components/bootstrap/dist/' ));
app.all('/*', (req, res) => res.sendFile(path.join(__dirname, './app', 'index.html')))


mongoose.connect('mongodb://maxbfrecka:Shug1234@ds133398.mlab.com:33398/mxforum')

app.listen(process.env.PORT || 8080, () => console.log(
  `Your app is listening on port ${process.env.PORT || 8080}`))