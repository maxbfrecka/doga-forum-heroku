const mongoose = require('mongoose')

//artist schema

const artistSchema = mongoose.Schema({
	artistName: {type: String, required: true},
	userName: {type: String, required: true},
	artistBio: String,
	artistImage: String,
	artistGenre: {type: String, required: true},
	artistId: {type: String, required: true},
	artistDateAdded: Date
})

artistSchema.methods.apiRepr = function() {

  return {
    id: this._id,
    artistName: this.artistName,
    artistGenre: this.artistGenre,
    userName: this.userName,
    artistImage: this.artistImage,
    artistId: this.artistId,
    artistBio: this.artistBio
  };
}


const Artist = mongoose.model('Artist', artistSchema);

module.exports = {Artist};