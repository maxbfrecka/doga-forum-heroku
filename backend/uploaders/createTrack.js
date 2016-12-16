const fs = require('fs')
const path = require('path')
const uuid = require('uuid')
const mv = require('mv')
const mkdirp = require('mkdirp-promise')

const {Artist} = require('../models/artistModel');
const {Album} = require('../models/albumModel');
const {Track} = require('../models/trackModel');

createTrack = function() {};

/* FILES NEED TO BE SAVED BY THEIR TRACK ID */

createTrack.prototype.uploadFile = function(req, res) {
  var file = req.files.file;

  //id for storage
  const trackId = uuid.v4()
  console.log('adding Track on server')

  //function to add file to Wav Path
  //called in a callback below
  addWavFile = function(artistId, albumId){
    //creates path with inputs
    const wavPath = '/../file-system/artists/'+artistId+'/albums/'+albumId+'/wav/'
    var tmp_path = file.path;
    //adds image to new folder
    var target_path = path.join(__dirname, wavPath + file.name)
    
    console.log('SAVING THE IMAGE:')
    console.log(target_path)
    
    var src = fs.createReadStream(tmp_path);
    console.log('attempting file write')
    var dest = fs.createWriteStream(target_path);
    src.pipe(dest);
  }

  //have to get Ids for the album and artist in order to create album/artist directory
  //define paths for file saving... not sure
  var artistId = undefined
  var albumId = undefined
  var mp3Path = '/../file-system/artists/'+artistId+'/albums/'+albumId+'/wav/'

  //function to get albumId and artistId
  getAlbumId = function(callback){
    console.log(req.body.trackAlbum)
    var queryAlbumId = Album.findOne(
      {'albumName': req.body.trackAlbum})
    queryAlbumId.exec(function(err, Album){
      if (err){
        console.log('error in the albumId part')
      } else {
        console.log(Album.albumId)
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
        callback(artistId, albumId, trackAlbumArt)
        //saves the file
        addWavFile(artistId, albumId)
      }
    })
  }

  addTrackToDatabase = function(artistId, albumId, trackAlbumArt){
    console.log('inside add to database')
    const dateAdded = new Date()
    //defines path for the album art
    const trackWavSource = artistId + '/albums/' + albumId + '/wav/' + req.files.file.name
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
          trackWavSource: trackWavSource
      })
    .then(track => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}))
  }

  getAlbumId(getArtistId)

}

module.exports = new createTrack();