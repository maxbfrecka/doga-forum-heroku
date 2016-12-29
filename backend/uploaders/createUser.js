const path = require('path')
const uuid = require('uuid')
const mv = require('mv')
const {User} = require('../models/userModel');

/*var AWS = require('aws-sdk');

var accessKeyId =  process.env.AWS_ACCESS_KEY || "xxxxxx";
var secretAccessKey = process.env.AWS_SECRET_KEY || "+xxxxxx+B+xxxxxxx";
console.log('access key id:')
console.log(accessKeyId)
AWS.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
});
var s3 = new AWS.S3(
  {apiVersion: '2006-03-01',
  signatureVersion: 'v4'
  }
);*/


createUser = function() {};
// this function will check if image upload is necessary first!
// this would upload the image to the artist folder
createUser.prototype.uploadFile = function(req, res) {
  const requiredFields = ['artistName', 'artistGenre', 'userName'];
  requiredFields.forEach(field => {
    // ensure that required fields have been sent over
    if (! (field in req.body && req.body[field])) {
      res.status(400).json({message: `Must specify value for ${field}`});
    }
  });
  //adds entry to mongoose database
  userDateAdded = new Date()
  User
    .create({

    })
    .then(
      user => res.status(201).json(user.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    }) 
}

module.exports = new createUser();