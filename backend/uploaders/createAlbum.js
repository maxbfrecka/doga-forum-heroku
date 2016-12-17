const fs = require('fs')
const path = require('path')
const uuid = require('uuid')
const mv = require('mv')
const mkdirp = require('mkdirp-promise')
const {Artist} = require('../models/artistModel');
const {Album} = require('../models/albumModel');

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


createAlbum = function() {};

createAlbum.prototype.uploadFile = function(req, res) {
  var file = req.files.file;
  //id for storage
  const albumId = uuid.v4()

  //adds image to new folder
  addFile = function(artistId, albumArtPath){
    read_file = fs.readFileSync(file.path)
    var params = {Bucket: 'dogaalbums', Key: albumArtPath, Body: read_file, ACL:"public-read"}
    s3.putObject(params, function(err, data) {
      console.log('attemping to upload to S3!')
      if (err) {
        console.log("Error uploading data: ", err)
      } else {
        console.log("Successfully uploaded data to myBucket/myKey")
        console.log(data)
        //remove local file.
        /*fs.unlink(file.path, function(err) {
            if (err) {console.log(err)}
        });   */
      }
    })
  }

  //callbacks at bottom ensure order of operations
  var artistId = undefined
  getArtistId = function(callbackA, callbackB) {
    console.log(req.body.albumArtist)
    var query = Artist.findOne({ 'artistName': req.body.albumArtist })
    query.exec(function(err, Artist) {
      if (err) {
        console.log('asdf')
      } else {
        artistId = Artist.artistId
        //create album art path
        const albumArtPath = artistId+'-'+albumId+'-'+file.originalFilename
        //adds to database using addalbumtodatabase and artistId
        callbackA(artistId, albumArtPath)
        //makes folders using artistId, then inserts file using addFile
        callbackB(artistId, albumArtPath)
      }
    })
  }

  //adds to albums collection
  addAlbumToDatabase = function(artistId, albumArtPath){
    console.log('inside add to database')
    console.log(artistId)
    const albumDateAdded = new Date()
    Album
      .create(
          {albumName:req.body.albumName, 
          albumUserName: req.body.albumUserName, 
          albumArtist: req.body.albumArtist,
          albumArtistImage: req.body.albumArtistImage,
          albumArt: albumArtPath,
          albumId: albumId,
          albumArtistId: artistId,
          albumDateAdded: albumDateAdded,
          albumTrackLength: req.body.albumTrackLength
          }
        )
      .then(album => res.status(204).json({message: 'It worked'}))
      .catch(err => res.status(500).json({message: 'Internal server error'}))
  }

  //arguments are placed in functions within getArtistId definition! this triggers everything!
  getArtistId(addAlbumToDatabase, addFile)

  

}

module.exports = new createAlbum();