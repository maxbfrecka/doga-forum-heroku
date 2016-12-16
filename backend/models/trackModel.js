const mongoose = require('mongoose')

//track schema

const trackSchema = mongoose.Schema({
		trackName: String,
		trackNumber: Number,
		trackArtist: String,
		trackArt: String,
		trackId: String,
		trackAlbumId: String,
		trackArtistId: String,
		trackArtistImage: String,
		trackAlbumArt: String,
		trackUserName: String,
		trackAlbum: String,
		trackGenre: String,
		trackWavSource: String,
		trackMp3Source: String,
		trackDateAdded: Date
})

trackSchema.methods.apiRepr = function() {

  return {
    id: this._id,
    trackName: this.trackName,
		trackNumber: this.trackNumber,
		trackArtist: this.trackArtist,
		trackArt: this.trackArt,
		trackId: this.trackId,
		trackAlbumId: this.trackAlbumId,
		trackArtistId: this.trackArtistId,
		trackArtistImage: this.trackArtistImage,
		trackAlbumArt: this.trackAlbumArt,
		trackUserName: this.trackUserName,
		trackAlbum: this.trackAlbum,
		trackGenre: this.trackGenre,
		trackWavSource: this.trackWavSource,
		trackMp3Source: this.trackMp3Source,
		trackDateAdded: this.trackDateAdded
  };
}

const Track = mongoose.model('Track', trackSchema);

module.exports = {Track};