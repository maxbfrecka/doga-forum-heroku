const fs = require('fs')
const path = require('path')
const uuid = require('uuid')
const mv = require('mv')
const mkdirp = require('mkdirp-promise')

const {Artist} = require('../models/artistModel');
const {Album} = require('../models/albumModel');
const {Track} = require('../models/trackModel');

var AWS = require('aws-sdk');

var accessKeyId =  process.env.AWS_ACCESS_KEY || "xxxxxx";
var secretAccessKey = process.env.AWS_SECRET_KEY || "+xxxxxx+B+xxxxxxx";
console.log(accessKeyId)
AWS.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
});
var s3 = new AWS.S3(
  {apiVersion: '2006-03-01',
  signatureVersion: 'v4'
  }
);


//naming conventions could use improvement
createTrack = function() {};
/* FILES NEED TO BE SAVED BY THEIR TRACK ID TO PREVENT DUPLICATES...*/
createTrack.prototype.uploadFile = function(req, res) {
  var file = req.files.file;
  console.log('adding Track on server')
  console.log(req.body.trackNumber)
  //id for storage
  const trackId = uuid.v4()
  //function to add file to Wav Path
  //called in a callback below
  addWavFile = function(trackWavSource){
    console.log('add File:')
    console.log(req.body.trackNumber)
    read_file = fs.readFileSync(file.path)
    var params = {Bucket: 'dogatracks', Key: trackWavSource, Body: read_file, ACL:"public-read"}
    s3.putObject(params, function(err, data) {
      if (err) {
        console.log("Error uploading data: ", err)
      } else {
        console.log("Successfully uploaded data to myBucket/myKey")
        //remove local file.
        /*fs.unlink(file.path, function(err) {
            if (err) {console.log(err)}
        });   */
      }
    })
  }

  //have to get Ids for the album and artist in order to create album/artist directory
  //define paths for file saving... not sure
  var artistId = undefined
  var albumId = undefined
  //function to get albumId and artistId
  getAlbumId = function(callback){
    var queryAlbumId = Album.findOne(
      {'albumName': req.body.trackAlbum})
    queryAlbumId.exec(function(err, Album){
      if (err){
        console.log('error in the albumId part')
      } else {
        albumId = Album.albumId
        trackAlbumArt = Album.albumArt
        //grab the artistId now...
        callback(albumId, trackAlbumArt, addTrackToDatabase)
      }
    })
  }

  getArtistId = function(albumId, trackAlbumArt, callback){
    var queryArtistId = Artist.findOne({ 'artistName': req.body.trackArtist })
    queryArtistId.exec(function(err, Artist) {
      if (err) {
        console.log('asdf')
      } else {
        artistId = Artist.artistId
        //adds to database
        const trackWavSource = artistId + '-' + albumId + '-' + trackId + '-' + req.files.file.originalFilename
        callback(artistId, albumId, trackAlbumArt, trackWavSource)
        //saves the file
        addWavFile(trackWavSource)
      }
    })
  }

  addTrackToDatabase = function(artistId, albumId, trackAlbumArt, trackWavSource){
    console.log('addtodatabase:')
    console.log(req.body.trackNumber)
    const dateAdded = new Date()
    //defines path for the album art
    //locates album and pushes new track...
    Track
    .create({
          trackName:req.body.trackName,
          trackNumber: req.body.trackNumber,
          trackAlbum: req.body.trackAlbum,
          trackUserName: req.body.trackUserName, 
          trackArtist: req.body.trackArtist,
          trackId: trackId,
          trackAlbumId: albumId,
          trackArtistId: artistId,
          trackArtistImage: req.body.trackArtistImage,
          trackAlbumArt: trackAlbumArt,
          trackDateAdded: dateAdded,
          trackWavSource: trackWavSource,
          trackAlbumTrackLength: req.body.trackAlbumTrackLength
      })
    .then(track => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}))
  }

  getAlbumId(getArtistId)

}

module.exports = new createTrack();