const fs = require('fs')
const path = require('path')
const uuid = require('uuid')
const mv = require('mv')
const mkdirp = require('mkdirp-promise')
const {Artist} = require('../models/artistModel');
const {Album} = require('../models/albumModel');

createAlbum = function() {};

createAlbum.prototype.uploadFile = function(req, res) {
  var file = req.files.file;
  //id for storage
  const albumId = uuid.v4()

  //function to add album folders
  makeDirs = function(artistId ,callback){
    //create directories using artistId
    const albumDirectory = '/Users/maxfrecka/Desktop/PROJECTS/doga-forum/backend/file-system/artists/'+artistId+'/albums/'+albumId
    const albumImages = albumDirectory + '/images/'
    const albumWav = albumDirectory + '/wav/'
    const albumMp3 = albumDirectory + '/mp3/'
    console.log('make directory:')
    console.log(albumImages)
    //create folders then use callback
    mkdirp(albumDirectory, function (err) {
      if (err) console.error(err)
      else mkdirp(albumImages, function (err) {
        if (err) console.error(err)
        else mkdirp(albumWav, function (err) {
          if (err) console.error(err)
          else mkdirp(albumMp3, function (err) {
            if (err) console.error(err)
            //pass artistId into callback for addFile function!
            else callback(artistId)
          })
        })
      })    
    })
  }

  //adds image to new folder
  addFile = function(artistId){
    var tmp_path = file.path;
    var target_path = path.join(__dirname, '/../file-system/artists/'+artistId+'/albums/'+ albumId + '/images/' + file.name)
    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path);
    src.pipe(dest);
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
        //adds to database using addalbumtodatabase and artistId
        callbackA(artistId)
        //makes folders using artistId, then inserts file using addFile
        callbackB(artistId, addFile)
      }
    })
  }

  //adds to albums collection
  addAlbumToDatabase = function(artistId){
    console.log('inside add to database')
    console.log(artistId)
    const dateAdded = new Date()
    //defines path for the album art
    const albumArt = artistId + '/albums/' + albumId + '/images/' + file.name
    Album
      .create(
          {albumName:req.body.albumName, 
          albumUserName: req.body.albumUserName, 
          albumArtist: req.body.albumArtist,
          albumArtistImage: req.body.albumArtistImage,
          albumArt: albumArt,
          albumId: albumId,
          albumArtistId: artistId,
          dateAdded: dateAdded
          }
        )
      .then(album => res.status(204).json({message: 'It worked'}))
      .catch(err => res.status(500).json({message: 'Internal server error'}))
  }

  //arguments are placed in functions within getArtistId definition! this triggers everything!
  getArtistId(addAlbumToDatabase, makeDirs)

  

}

module.exports = new createAlbum();