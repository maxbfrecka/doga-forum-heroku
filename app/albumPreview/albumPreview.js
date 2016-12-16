angular.module('albumPreview',[])
.directive('mxAlbumPreview', ['ngAudio', 'nowPlayingList', 'browseTestData', 'libraryData', function(ngAudio, nowPlayingList, browseTestData, libraryData){
	return {
		restrict: 'E',
	  templateUrl: 'albumPreview/albumPreview.html',
	  scope: {},
	  transclude: true,
	  controllerAs: "apc",
	  link: function(scope, element, attrs){
	  	//for displaying data
	  	scope.artistName =attrs.artistName
	  	scope.albumTitle=attrs.albumTitle
	  	scope.albumCover=attrs.albumCover

	  	scope.addAlbum = function(artistName, albumName){ 
	  		libraryData.addAlbum(artistName, albumName)
	  	}


	  	//play album from album list page
	  	scope.playAlbum = function(){
	  		console.log('tried to play')
	  		//locates the album through directive instance
	  		scope.artists = browseTestData.artists
		  	//get artist and album name from name in directive
		  	browseTestData.currentArtistName = scope.artistName;
		  	browseTestData.currentAlbumName = scope.albumTitle
		  	console.log(scope.artistName)
		  	scope.currentArtistName = browseTestData.currentArtistName
		  	scope.currentAlbumName = browseTestData.currentAlbumName
		  	console.log(scope.currentAlbumName)
		  	console.log(scope.artists)
		  	//search data for artist object
		  	browseTestData.currentArtist = scope.artists.filter(function(obj) {
	    		return obj.artist.replace(/\s+/g, '-').toLowerCase() === scope.currentArtistName.replace(/\s+/g, '-').toLowerCase();
				})[0];
				scope.currentArtist = browseTestData.currentArtist;
				console.log(scope.currentArtist)
				//search currentArtist for album object from url
				browseTestData.currentAlbum = scope.currentArtist.albums.filter(function(obj) {
	    		return obj.albumTitle.replace(/\s+/g, '-').toLowerCase() === scope.currentAlbumName.replace(/\s+/g, '-').toLowerCase();
				})[0];
				scope.currentAlbum = browseTestData.currentAlbum



	  		nowPlayingList.nowPlayingTrack = scope.currentAlbum.tracks[0]
				nowPlayingList.nowPlayingAlbum = scope.currentAlbum
				nowPlayingList.nowPlayingArtist = scope.currentArtist
				nowPlayingList.nowPlayingAlbumLength = scope.currentAlbum.tracks.length
				nowPlayingList.nowPlayingTrackNumber = nowPlayingList.nowPlayingTrack.trackNumber
				console.log(nowPlayingList.nowPlayingTrackNumber)
				// tracknumber system needs improvemen
				//registers change
				nowPlayingList.nowPlayingChange = !nowPlayingList.nowPlayingChange

	  	}



	  },
	  controller: function(){

	  	

			



	  }
	}
}])










.filter('removeSpacesThenLowercase', function () {
  return function (text) {
  	console.log(text)
  	if (text){
	    var str = text.replace(/\s+/g, '-')
	    return str.toLowerCase()
	    }
	  }
})