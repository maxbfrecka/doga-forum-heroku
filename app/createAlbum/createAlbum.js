angular.module('createAlbum',['ngFileUpload'])
.directive('mxCreateAlbum', ['ngAudio', 'nowPlayingList', 'browseTestData', 'libraryData', '$http', 'Upload', 'addAlbumData', '$location', '$window', 'artistData', function(ngAudio, nowPlayingList, browseTestData, libraryData, $http, Upload, addAlbumData, $location, $window, artistData){
	return {
		restrict: 'E',
	  templateUrl: 'createAlbum/createAlbum.html',
	  scope: {},
	  transclude: true,
	  controllerAs: "calbc",
	  
	  link: function(scope, element, attrs){
	  	//artist name that album is for
	  	scope.artistEditName = addAlbumData.currentAlbumArtistEdit
	  	scope.albumName = ''
	  	scope.currentArtistData = ''


	  	//gets the current artist Info in order to add artistArt to album database
	  	scope.getCurrentArtistInfo = function(artistEditName){
	  		artistData.getOneArtist(artistEditName)
	  		.then(function (response) {
	  			console.log(response.data)
          scope.currentArtistData = response.data
          console.log('logging current artist image')
          console.log(scope.currentArtistData.artistImage)
        }, function (error) {
          console.log('failure to load artists')
        })
	  	}


	  	//need array of track information
	  	scope.tracks = new Array()
	  	//funtion to add new information to ng-repeat
	  	scope.addNewTrack = function(){
	  		scope.getCurrentArtistInfo(scope.artistEditName)
	  		trackNumber = scope.tracks.length+1
	  		scope.tracks.push({trackNumber: trackNumber, trackName: '', trackFile: scope.trackFile, trackArtistImage: scope.currentArtistData.artistImage})
	  		console.log(scope.tracks)

	  	}

	  	//CALLBACK IS USED INSIDE uploadAlbumArt to UPLOAD TRACKS
		  scope.submitAlbum = function() {
	  		console.log(scope.albumImageFile)
	      if (scope.form.albumImage.$valid && scope.albumImageFile) {
	        scope.uploadAlbumArt(scope.albumImageFile)
	      }
   	 	}
   	 	//starter function for adding album
   	 	//will hit that API
   	 	//adds album name folder, wav/mp3, and images folder
   	 	//adds album to artist in database
   	 	//should RETURN A CALLBACK afterward, by taking a callback!
	  	scope.username = 'TEST USERNAME'

	  	//file is inserted above into the function in submitAlbum()
	  	scope.uploadAlbumArt = function (file) {
	  		//gets artist info to add to album file if wanted
	  		//will add artistImage
	  		scope.getCurrentArtistInfo(scope.artistEditName)
	  		const url = '/../api/createAlbum'
        Upload.upload({
            url: '/../api/createAlbum',
            data: {file: file, albumUserName: scope.username, albumArtist: scope.artistEditName, albumName: scope.albumName, albumArtistImage: scope.currentArtistData.artistImage},
            file: file
        }).then(function (res) {
            console.log('Success ' + res.config.data.file.name + 'uploaded. Response: ' + res.data)
            //CALL BACK FUNCTION SHOULD BE FIRED HERE, TO UPLOAD TRACKS!
        		console.log('your boy should be firing now...')
           	scope.uploadTracks(scope.tracks)
        }, function (res) {
            console.log('Error status: ' + res.status)
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total)
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name)
        })
	    }

	    scope.uploadTracks = function (files) {
	      if (files && files.length) {
	        for (var i = 0; i < files.length; i++) {
	          Upload.upload({
	          	url: '/../api/createTrack', 
	          	data: {file: files[i].trackFile, trackUserName: scope.username, trackNumber: files[i].trackNumber, trackName: files[i].trackName, trackAlbum: scope.albumName, trackArtist: scope.artistEditName, trackArtistImage: scope.currentArtistData.artistImage},
	        		file: files[i].trackFile
	        	})
	        }
	      }
	    }

    //call like this
		//scope.uploadTracks(scope.tracks)







	    /*scope.uploadAlbumTrack = function(file) {
	    	const url = '/../api/createTracks'
        Upload.upload({
            url: '/../api/createTracks',
            data: {file: file, albumUserName: scope.username, albumArtist: scope.artistName, albumName: scope.albumName},
            file: file
        }).then(function (res) {
            console.log('Success ' + res.config.data.file.name + 'uploaded. Response: ' + res.data)
        }, function (res) {
            console.log('Error status: ' + res.status)
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total)
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name)
        })
	    }

	    }
*/



	  },

	  controller: function(){
	  }
	}
}])



.factory('addAlbumData', function(){
	addAlbumData = {}

	//stores current albumArtist being edited
	addAlbumData.currentAlbumArtistEdit = undefined

	addAlbumData.setAlbumArtistEdit = function(artist){
		addAlbumData.currentAlbumArtistEdit = artist
		console.log('inside add album data funct')
		console.log(addAlbumData.currentAlbumArtistEdit)

	}


	return addAlbumData
})
