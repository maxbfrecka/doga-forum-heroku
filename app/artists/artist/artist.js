angular.module('artist', [])
.directive('mxArtist', ['ngAudio', 'nowPlayingList', 'browseTestData', 'libraryData', '$http', 'Upload', 'artistData', '$routeParams', '$location', 'addAlbumData', 'albumData', 'trackData', function(ngAudio, nowPlayingList, browseTestData, libraryData, $http, Upload, artistData, $routeParams, $location, addAlbumData, albumData, trackData){
	return {
		restrict: 'E',
	  templateUrl: 'artists/artist/artist.html',
	  scope: {},
	  transclude: true,
	  controllerAs: "aac",
	  
	  link: function(scope, element, attrs){

	  	window.scrollTo(0, 0)

	  	//for showing/hiding add an album form
	  	scope.editAddAlbum = false

	  	scope.artists = ''
	  	scope.currentArtist = ''
	  	scope.tracks = ''

	  	getArtists();
	    function getArtists() {
	      artistData.getArtists()
        .then(function (response) {
          scope.artists = response.data.artists
          artistData.artists = scope.artists
          console.log(scope.artists)

          //this is abominable, must be fixed
          //artist name from URL
			  	scope.currentArtistName = $routeParams.artist;
			  	//search the artists list for the right artist
			  	//this function MUST be fixed to work directly with entire database.//
			  	//!!!!!!!!!!!!!!//
			  	scope.currentArtist = scope.artists.filter(function(obj) {
			    		return obj.artistName.replace(/\s+/g, '-').toLowerCase() === scope.currentArtistName.replace(/\s+/g, '-').toLowerCase();
					})[0];

			  	getAlbums(scope.currentArtist.artistName)
        }, function (error) {
          console.log('failure to load')
        })
	    }

	    
	    //places in currentArtist.artistName from above function, may need to put this in that function!
	    function getAlbums(albumArtist){
	    	albumData.getAlbums(albumArtist)
	    	.then(function (response){
	    		scope.albums = response.data
	    		console.log(scope.albums)
	    	}, function(error){
	    		console.log('albums failed to load')
	    	})
	    }

	    //needs to take NAME of artist and NAME of album to put into api url exactly
	    function getTracks(albumArtist, albumName, callback){
	    	trackData.getTracks(albumArtist, albumName)
	    	.then(function (response){
	    		scope.tracks = response.data
	    		trackData.tracks = scope.tracks
	    		console.log(response)
	    		console.log(scope.tracks)
	    		callback()
	    	}, function(error){
	    		console.log('tracks failed to load')
	    	})
	    }


	    //function to set current artist that is being edited
	    //then changes to create album page, where you will use that data!
	    scope.setAlbumArtistEdit = function(artist){
	    	addAlbumData.setAlbumArtistEdit(artist)
	    	$location.path('/createAlbum')
	    }

	    scope.playAlbum = function(artist, album){
	    	const _artist = artist
	    	const _album = album
	    	getTracks(_artist.artistName,_album.albumName, function(){
	    		console.log(scope.tracks)
	    		nowPlayingList.nowPlayingArtist = scope.currentArtist
	    		nowPlayingList.nowPlayingAlbum = album
	    		nowPlayingList.nowPlayingTrack = scope.tracks[0]
	    		nowPlayingList.nowPlayingTracks = scope.tracks
					nowPlayingList.nowPlayingAlbumLength = scope.tracks[0].trackAlbumTrackLength
					nowPlayingList.nowPlayingTrackNumber = nowPlayingList.nowPlayingTrack.trackNumber
					// tracknumber system needs improvemen
					//registers change
					nowPlayingList.nowPlayingChange = !nowPlayingList.nowPlayingChange
	    	})
	  	}
			

	  },

	  controller: function(){
	  }
	}
}])


.factory('albumData', ['$http', '$q', function($http, $q){
	albumData = {}

		albumData.albums = undefined
		
		albumData.getAlbums = function(albumArtist){
			const APIURL = '/api/albums/'+albumArtist
			console.log('the API URL to get albums:')
			console.log(APIURL)
			return $http.get(APIURL, {cache:true})
	  }

	  
	  
	  albumData.showAlbums = function(){
	    	albumData.getAlbums()
	    	.then(function(response){
	    		albumData.albums = response.data.albums
	    	}, function(error){
	    		console.log('failed')
	    	})	
	    }




	return albumData
}])






