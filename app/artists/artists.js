angular.module('artists', [])
.directive('mxArtists', ['ngAudio', 'nowPlayingList', 'browseTestData', 'libraryData', '$http', 'Upload', 'artistData', function(ngAudio, nowPlayingList, browseTestData, libraryData, $http, Upload, artistData){
	return {
		restrict: 'E',
	  templateUrl: 'artists/artists.html',
	  scope: {},
	  transclude: true,
	  controllerAs: "ac",
	  
	  link: function(scope, element, attrs){


	  	scope.artists = ''
	  	
	  	getArtists();
	    function getArtists() {
	      artistData.getArtists()
        .then(function (response) {
          scope.artists = response.data.artists
          artistData.artists = scope.artists
          console.log(scope.artists)
        }, function (error) {
          console.log('failure to load')
        })
	    }
    	
	  	console.log(scope.artists)

	  
	  },

	  controller: function(){
	  }
	}
}])

.factory('artistData', ['$http', '$q', function($http, $q){
	
	artistData = {}

		artistData.artists = undefined

		
		artistData.getArtists = function(){
			return $http.get('/api/getArtists', {cache:true})
    }

    artistData.getOneArtist = function(artistName){
    	const APIURL = '/artists/' + artistName
    	return $http.get(APIURL, {cache:true})
    }

    artistData.showArtists = function(){
    	artistData.getArtists()
    	.then(function(response){
    		artistData.artists = response.data.artists
    	}, function(error){
    		console.log('failed')
    	})	
    }

	return artistData
}])