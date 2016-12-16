const fs = require('fs')
const path = require('path')
const uuid = require('uuid')
const mv = require('mv')
const mkdirp = require('mkdirp-promise')
const {Artist} = require('../models/artistModel');

createArtist = function() {};


// this function will check if image upload is necessary first!
// this would upload the image to the artist folder
createArtist.prototype.uploadFile = function(req, res) {
  var file = req.files.file;
  
  //stored to database and used in filepath
  const artistId = uuid.v4()


  console.log(req.body.artistName)
  console.log('INSIDE CREATE ARTIST')
  
  //must create the folders for files before inserting them
  const artistDirectory = '/Users/maxfrecka/Desktop/PROJECTS/doga-forum/backend/file-system/artists/'+artistId
  const artistDirectoryImages = artistDirectory + '/images/'
  const artistDirectoryAlbums = artistDirectory + '/albums/'
  const artistDirectoryTempFiles = artistDirectory + '/albums/tempFiles/'

  //creates new folder for artist then adds images folder, then adds file in the callback at bottom
  makeDirs = function(callback){
    mkdirp(artistDirectory, function (err) {
      if (err) console.error(err)
      else mkdirp(artistDirectoryImages,function (err) {
        if (err) console.error(err)
        else mkdirp(artistDirectoryAlbums,function (err) {
          if (err) console.error(err)
          else mkdirp(artistDirectoryTempFiles,function (err) {
            if (err) console.error(err)
            else callback()
          })
        })
      })    
    })
  }
  addFile = function(){
    console.log('SAVING THE IMAGE')
    console.log(file.path)
    var tmp_path = file.path;
    //adds image to new folder
    var target_path = path.join(__dirname, '/../file-system/artists/'+artistId+'/images/'+file.name)
    var src = fs.createReadStream(tmp_path);
    console.log('attempting file write')
    console.log(src)
    var dest = fs.createWriteStream(target_path);
    src.pipe(dest);
  }
  makeDirs(addFile)

  //save to database
  const artistImage = artistId + '/images/' + req.files.file.name
  const requiredFields = ['artistName', 'artistGenre', 'userName'];
  requiredFields.forEach(field => {
    // ensure that required fields have been sent over
    if (! (field in req.body && req.body[field])) {
      res.status(400).json({message: `Must specify value for ${field}`});
    }
  });
  //adds entry to mongoose database
  Artist
    .create({
      artistName: req.body.artistName,
      artistGenre: req.body.artistGenre,
      artistImage: artistImage,
      userName: req.body.userName,
      artistId: artistId
    })
    .then(
      artist => res.status(201).json(artist.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    })
      
}

module.exports = new createArtist();