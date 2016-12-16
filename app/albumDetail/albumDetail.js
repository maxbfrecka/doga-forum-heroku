angular.module('albumDetail',[])
.directive('mxAlbumDetail', ['ngAudio', 'browseTestData', '$routeParams', '$location', 'nowPlayingList', 'albumData', 'trackData', 'artistData', function(ngAudio, browseTestData, $routeParams, $location, nowPlayingList, albumData, trackData, artistData){
	return {
		restrict: 'E',
	  templateUrl: 'albumDetail/albumDetail.html',
	  scope: {},
	  transclude: true,
	  controllerAs: "adc",
	  link: function(scope, element, attrs){
	  	window.scrollTo(0, 0)
	  	scope.test = "FFFFFUUUU"
	  },
	  controller: function(ngAudio){
	  	var adc = this

	  	adc.artists = ''
	  	adc.albums = ''
	  	adc.tracks = ''
	  	adc.currentAlbum = ''
	  	adc.currentArtist = ''


	  	//should NOT be getting every single artist... or every single album... 
	  	//...every time...this needs to be fixed to simply query tracks somehow
	  	//same goes for album view
	  	//works for now but atrocious when database is more used
	  	getArtists();
	    function getArtists() {
	      artistData.getArtists()
        .then(function (response) {
        	console.log('artists response')
        	console.log(response.data.artists)
        	console.log(response.data)
          adc.artists = response.data.artists
          artistData.artists = adc.artists
          console.log(adc.artists)
          //artist/album name from URL in its filtered form
			  	adc.currentArtistName = $routeParams.artist;
			  	adc.currentAlbumName = $routeParams.album
			  	//search database by applying the filter to database artistName then comparing
			  	adc.currentArtist = adc.artists.filter(function(obj) {
			    		return obj.artistName.replace(/\s+/g, '-').toLowerCase() === adc.currentArtistName.replace(/\s+/g, '-').toLowerCase();
					})[0];
			  	//do same for albums...
			  	console.log(adc.currentArtist.artistName)
					getAlbums(adc.currentArtist.artistName)
        }, function (error) {
          console.log('failure to load artists')
        })
	    }
	    //getAlbums function is called above
	    function getAlbums(albumArtist){
	    	albumData.getAlbums(albumArtist)
	    	.then(function (response){
					adc.albums = response.data
					console.log(response.data)
					console.log(adc.albums)
					adc.currentAlbumName = $routeParams.album;
			  	//search database by applying the filter to database artistName then comparing
			  	adc.currentAlbum = adc.albums.filter(function(obj) {
			    		return obj.albumName.replace(/\s+/g, '-').toLowerCase() === adc.currentAlbumName.replace(/\s+/g, '-').toLowerCase();
					})[0];
					//get tracks with that info...
					getTracks(albumArtist, adc.currentAlbum.albumName)
	    	}, function(error){
	    		console.log('albums failed to load')
	    	})
	    }
	    //called after getAlbums function is called
	    function getTracks(albumArtist, albumName){
	    	trackData.getTracks(albumArtist, albumName)
	    	.then(function (response){
	    		adc.tracks = response.data
	    		trackData.tracks = adc.tracks
	    		console.log('queued track')
	    		console.log(nowPlayingList.queuedTrack)
	    		console.log(adc.tracks[0])
	    	}, function(error){
	    		console.log('tracks failed to load')
	    	})
	    }

	    //for play button without pressing track, 
	    //or for clicking on album art
	    nowPlayingList.queuedAlbum = adc.currentAlbum
			nowPlayingList.queuedArtist = adc.currentArtist
			nowPlayingList.queuedTrack = adc.tracks[0]

			adc.playTrack = function(track, album, artist){
				nowPlayingList.nowPlayingTrack = track
				nowPlayingList.nowPlayingAlbum = album
				nowPlayingList.nowPlayingArtist = artist
				nowPlayingList.nowPlayingAlbumLength = adc.tracks.length
				nowPlayingList.nowPlayingTrackNumber = track.trackNumber
				// tracknumber system needs improvemen
				//registers change
				nowPlayingList.nowPlayingChange = !nowPlayingList.nowPlayingChange
			}


	  }
	}
}])

.factory('trackData', ['$http', function($http){
	trackData = {}

	trackData.tracks = []

	trackData.getTracks = function(albumArtist, albumName){
		const APIURL = '/tracks/'+albumArtist+'/'+albumName
		console.log('the API URL to get tracks:')
		console.log(APIURL)
		return $http.get(APIURL, {cache:true})
	}

	return trackData
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