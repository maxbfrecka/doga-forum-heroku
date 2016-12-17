const fs = require('fs')
const path = require('path')
const uuid = require('uuid')
const mv = require('mv')
const mkdirp = require('mkdirp-promise')
const {Artist} = require('../models/artistModel');

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


createArtist = function() {};
// this function will check if image upload is necessary first!
// this would upload the image to the artist folder
createArtist.prototype.uploadFile = function(req, res) {

  var file = req.files.file;
  console.log(file)
    //stored to database and used in filepath
  const artistId = uuid.v4()
  //defines the filename to be stored in amazon S3...
  const artistImagePath = artistId+'-'+file.originalFilename

  console.log(artistImagePath)

  //adds image to s3 hopefully
  addFile = function(){
    read_file = fs.readFileSync(file.path)
    var params = {Bucket: 'dogaartists', Key: artistImagePath, Body: read_file, ACL:"public-read"}
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
    })}

  addFile()

  const requiredFields = ['artistName', 'artistGenre', 'userName'];
  requiredFields.forEach(field => {
    // ensure that required fields have been sent over
    if (! (field in req.body && req.body[field])) {
      res.status(400).json({message: `Must specify value for ${field}`});
    }
  });
  //adds entry to mongoose database
  artistDateAdded = new Date()
  Artist
    .create({
      artistName: req.body.artistName,
      artistGenre: req.body.artistGenre,
      artistImage: artistImagePath,
      userName: req.body.userName,
      artistId: artistId,
      artistDateAdded: artistDateAdded
    })
    .then(
      artist => res.status(201).json(artist.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    }) 
}

module.exports = new createArtist();