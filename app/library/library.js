angular.module('myLibrary',[])
.directive('mxLibrary', ['ngAudio', 'browseTestData', '$routeParams', '$location', 'nowPlayingList', 'libraryData', '$timeout', function(ngAudio, browseTestData, $routeParams, $location, nowPlayingList, libraryData, $timeout){
	return {
		restrict: 'E',
	  templateUrl: 'library/library.html',
	  scope: {},
	  transclude: true,
	  controllerAs: "lc",
	  link: function(scope, element, attrs){
	  	window.scrollTo(0, 0)
	  	scope.myLibrary = libraryData.library
	  	scope.getAlbums = libraryData.getAlbums
	  	scope.getTracks = libraryData.getTracks

	  	scope.artists = scope.myLibrary
	  	scope.albums = scope.getAlbums()
	  	scope.tracks = scope.getTracks(scope.albums)

	  	//color when an item is selected?
	  	scope.hiliter = 'red'



	  	scope.currentTracks = []
	  	scope.$watch(function(){return scope.tracks},
	  		function(){
	  		scope.getCurrentTracks(scope.tracks)
	  		}
	  	)
	  	

	  	//everything will need individual ID soon

	  	//returns current Tracks as array for display
	  	//playing in queue?
	  	scope.getCurrentTracks = function(tracks){
	  		console.log(scope.artists)
	  		var _currentTracks = []
	  		//iterate over tracks
	  		for (i=0; i<tracks.length; i++){
	  			var trackTitle = tracks[i].trackTitle
	  			var trackNumber = tracks[i].trackNumber
	  			var albumTitle = undefined
	  			var artistTitle = undefined
	  			var albumCheck = undefined
	  			var artistCheck = undefined
	  			//find album
	  			for (j=0; j<scope.albums.length; j++){
	  				albumCheck = scope.albums[j]
	  				for (k=0; k<albumCheck.tracks.length; k++){
	  					if (albumCheck.tracks[k].trackTitle===trackTitle){
	  						//track's album title:
	  						albumTitle = albumCheck.albumTitle
	  						console.log(albumTitle)
	  					}
	  				}
	  			}
	  			for (j=0; j<scope.artists.length; j++){
	  				artistCheck = scope.artists[j]
	  				for (k=0; k<artistCheck.albums.length; k++){
	  					if (artistCheck.albums[k].albumTitle===albumTitle){
	  						artistTitle = artistCheck.artist
	  						console.log(artistTitle)
	  					}
	  				}
	  			}
	  			_currentTracks.push({trackTitle:trackTitle, albumTitle:albumTitle, artistTitle:artistTitle, trackNumber:trackNumber})	
	  		}
	  		console.log(_currentTracks)
	  		scope.currentTracks = _currentTracks
	  	}





	  	// have a way to deselect it
	  	scope.selectArtist = function(artist){
	  		//sets albums/tracks according to selected artist
	  		var artists = scope.artists
		  	//search data for artist object using function input artist name and album title
		  	var currentArtist = artists.filter(function(obj) {
	    		return obj.artist.replace(/\s+/g, '-').toLowerCase() === artist.artist.replace(/\s+/g, '-').toLowerCase();
				})[0];
				//return only albums that are by that artist
				console.log(currentArtist)
				scope.albums = currentArtist.albums
				scope.tracks = scope.getTracks(scope.albums)
	  	}

	  	scope.selectAlbum = function(album){
	  		//reset everything first


	  		//sets albums/tracks according to selected artist
	  		var artists = scope.artists
	  		var albums = scope.albums
		  	//search data for artist object using function input artist name and album title
		  	var currentAlbum = albums.filter(function(obj) {
	    		return obj.albumTitle.replace(/\s+/g, '-').toLowerCase() === album.albumTitle.replace(/\s+/g, '-').toLowerCase();
				})[0];
				//return only albums that are by that artist
				console.log(currentAlbum)
				scope.tracks = currentAlbum.tracks
	  	}











		}
	}
}])



.factory('libraryData', function(){
	libraryData = {}

	//filters for when an item is clicked













	//what the library structure looks like
	libraryData.library = [
		{
			artist: 'Dada',
			albums: [
				{
				albumTitle: 'dada',
				albumCover: 'dada',
				tracks: [
					{
						trackNumber: 3,
						trackTitle: 'dada',
						sourceFile: 'dada'
					}
				]
				}
			]
		}/*,
		{
			artist: 'Banzaei',
			albums: [
				{
				albumTitle: 'Sharp Metal',
				albumCover: 'dada',
				tracks: [
					{
						trackNumber: null,
						trackTitle: 'dadaWawa',
						sourceFile: 'dada'
					}
				]
				}
			]
		}*/
	]


	//i had to do this ... function "get tracks" works after getAlbums runs in directive and is fed the albums object there
	libraryData.getAlbums = function(){
		albums = []
		for (i=0; i<libraryData.library.length; i++){
			for (j=0; j<libraryData.library[i].albums.length; j++){
				albums.push(libraryData.library[i].albums[j])
			}
		}
		console.log(albums)
		return albums
	}


	libraryData.getTracks = function(albums){
		tracks = []
		for (i=0; i<albums.length; i++){
			for (j=0; j<albums[i].tracks.length; j++){
				tracks.push(albums[i].tracks[j])
			}
		}
		return tracks
	}



	// put tracks you want to add to an array
	// for track in tracks
	// get artist name and album name
	// search library for artist name
	// if artist is in library.artists
	// search library.artists.artist.albums for album
	// if album is in library.artists.artist.albums
	// search library.artists.artist.albums.tracks for the track you want to add
	// if the track is not present
	// push the track to that part of the library
	// if the track is present
	// go to next track
	// when done, stop pushing


	//for adding an entire album
	libraryData.addAlbum = function(artistName, albumTitle){
		//search library for artist, album track to make sure they aren't in there
		//if artistIndex etc
		debugger
		var artistIndex = null
		var albumIndex = true
		//check if artist is already in library, if it is then set artistIndex... if not, then add new artist after this is run
		for (iArtist=0; iArtist<libraryData.library.length; iArtist++){
			if (libraryData.library[iArtist].artist===artistName){
				artistIndex = iArtist
				var albums = libraryData.library[iArtist].albums
				for (iAlbum=0; iAlbum<albums.length; iAlbum++){
					//if album is already there then nothing needs to be added, return null so the following function won't fire
					if(albums[iAlbum].albumTitle===albumTitle){
						albumIndex=null}
				}
			}
		}

		//use artistIndex and albumIndex to determine what to add...
		//if artist and if album
		if (artistIndex!=null){
			//do nothing if the album is there already
			if (albumIndex!=true){
				return
				//add album to artist file
			} else {
				var artists = browseTestData.artists
		  	//search data for artist object using function input artist name and album title
		  	var currentArtist = artists.filter(function(obj) {
	    		return obj.artist.replace(/\s+/g, '-').toLowerCase() === artistName.replace(/\s+/g, '-').toLowerCase();
				})[0];
				//search above array for the album information
				var currentAlbum = currentArtist.albums.filter(function(obj) {
	    		return obj.albumTitle.replace(/\s+/g, '-').toLowerCase() === albumTitle.replace(/\s+/g, '-').toLowerCase();
				})[0];
				//add the album to the library by using the array that was located above...
				console.log(currentAlbum)
				libraryData.library[artistIndex].albums.push(currentAlbum)
				console.log(libraryData)
			}
			//otherwise if artist is not already in library...
		} else {
			var artists = browseTestData.artists
	  	//search data for artist object using function input artist name and album title
	  	var currentArtist = artists.filter(function(obj) {
    		return obj.artist.replace(/\s+/g, '-').toLowerCase() === artistName.replace(/\s+/g, '-').toLowerCase();
			})[0];
			//search above array for the album information
			var currentAlbum = currentArtist.albums.filter(function(obj) {
    		return obj.albumTitle.replace(/\s+/g, '-').toLowerCase() === albumTitle.replace(/\s+/g, '-').toLowerCase();
			})[0];
			//add a new OBJECT for the artist in the library
			//put currentAlbum into the albums array
			libraryData.library.push({artist: artistName, albums: [currentAlbum]})
			console.log(libraryData.library)
		}
	}
	artistIndex=null
	albumIndex=null

	return libraryData
})











