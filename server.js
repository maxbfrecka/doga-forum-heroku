'use strict';
const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path')
const multer = require('multer')
const upload = multer({ dest: __dirname+'/backend/file-system/artists'})
const fs = require('fs')
const multiparty = require('multiparty')

//set up database
mongoose.Promise = global.Promise;
const {PORT, DATABASE_URL} = require('./backend/config');
const {Artist} = require('./backend/models/artistModel');
const {Album} = require('./backend/models/albumModel');
const {Track} = require('./backend/models/trackModel');

//file upload
const multipart = require('connect-multiparty');
const multipartyMiddleware = multipart(),
// file upload
createArtist = require('./backend/uploaders/createArtist');
createAlbum = require('./backend/uploaders/createAlbum');
createTrack = require('./backend/uploaders/createTrack');
const app = express()
app.use(express.static(__dirname))
app.use(bodyParser.json());






//return one artist
app.get('/artists/:artistName', (req, res) => {
  Artist
    .findOne({artistName: req.params.artistName})
    .exec()
    .then(artist =>res.json(artist.apiRepr()))
    .catch(err => {
      console.error(err);
        res.status(500).json({message: 'Internal server error'})
    });
});

//should query TRACKS database for tracks
app.get('/tracks/:albumArtist/:albumName', (req, res) => {
  Track
    .find({trackAlbum: req.params.albumName, trackArtist: req.params.albumArtist})
    .exec()
    .then(track =>res.json(track))
    .catch(err => {
      console.error(err);
        res.status(500).json({message: 'Internal server error'})
    });
});

//gets albums for artist
app.get('/albums/:artistName', (req, res) => {
  Album
    .find({albumArtist: req.params.artistName})
    .exec()
    .then(album =>res.json(album))
    .catch(err => {
      console.error(err);
        res.status(500).json({message: 'Internal server error'})
    });
});



//gets specific album
app.get('/albums/:artistName/:albumName', (req, res) => {
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
        res.status(500).json({message: 'Internal server error'})
    });
});





//adds album folder, adds album to database onto artist, adds cover art
app.post('/api/createAlbum', multipartyMiddleware, createAlbum.uploadFile)
//add track to database and save to file system
app.post('/api/createTrack', multipartyMiddleware, createTrack.uploadFile)

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './app', 'index.html')))
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
        res.status(500).json({message: 'Internal server error'});
    });
});









mongoose.connect('mongodb://maxbfrecka:Shug1234@ds133398.mlab.com:33398/mxforum')

app.listen(process.env.PORT || 8080, () => console.log(
  `Your app is listening on port ${process.env.PORT || 8080}`))