angular.module('createAlbum',['ngFileUpload', 'uuid'])
.directive('mxCreateAlbum', ['ngAudio', 'nowPlayingList', 'browseTestData', 'libraryData', '$http', 'Upload', 'addAlbumData', '$location', '$window', 'artistData', 'uuid4', '$timeout', function(ngAudio, nowPlayingList, browseTestData, libraryData, $http, Upload, addAlbumData, $location, $window, artistData, uuid, $timeout){
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
	  		//define the id
	  		// const trackId = uuid.v4()
	  		scope.getCurrentArtistInfo(scope.artistEditName)
	  		trackNumber = scope.tracks.length+1
	  		scope.tracks.push({trackNumber: trackNumber, trackName: '', trackFile: scope.trackFile, trackArtistImage: scope.currentArtistData.artistImage, uploadProgress: scope.uploadProgress})
	  		console.log(scope.tracks)

	  	}

	  	//this uploads the file immediately on selection to amazon S3
	  	/*scope.upload = function (file) {
        Upload.upload({
            url: '/../api/createTrack',
            data: {file: file, 'username': $scope.username}
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    	};*/

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
            data: {file: file, albumUserName: scope.username, albumArtist: scope.artistEditName, albumName: scope.albumName, albumArtistImage: scope.currentArtistData.artistImage, albumTrackLength: scope.tracks.length},
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
	    	console.log('angular track upload:')
	    	console.log(files)
	      if (files && files.length) {
	      	var i = -1
		      	if (i < files.length){
		      		$timeout(function(){i+=1}, 100)
			      	scope.$watch(function(){return i},
					  		function(){
				        	console.log('angular uploading file!')
				        	console.log(files[i].trackNumber)
				          Upload.upload({
				          	url: '/../api/createTrack', 
				          	data: {file: files[i].trackFile, trackUserName: scope.username, trackNumber: files[i].trackNumber, trackName: files[i].trackName, trackAlbum: scope.albumName, trackArtist: scope.artistEditName, trackArtistImage: scope.currentArtistData.artistImage, trackAlbumTrackLength: scope.tracks.length},
				        		file: files[i].trackFile
				        	}).then(function (res) {
			            console.log('Success ' + res.config.data.file.name + 'uploaded. Response: ' + res.data)
			            i+=1
			            //when this is successful, it should upload the next file.
				        	}, function (res) {
			            console.log('Error status: ' + res.status)
			        		}, function (evt) {
			            scope.uploadProgress = parseInt(100.0 * evt.loaded / evt.total)
			            console.log('progress: ' + scope.uploadProgress + '% ' + evt.config.data.file.name)
			        		})
					    	}
					    )
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
