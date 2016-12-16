angular.module('musicController',[])
.directive('mxMusicController', ['ngAudio', 'nowPlayingList', '$timeout', function(ngAudio, nowPlayingList, $timeout){
	return {
		restrict: 'E',
	  templateUrl: 'musicPlayer/musicController.html',
	  scope: {},
	  transclude: true,
	  controllerAs: "mc",
	  link: function(scope, element, attrs){

	  	scope.nowPlayingTrack = nowPlayingList.nowPlayingTrack
	  	scope.musicControllerAlbumArtPath = null

	  	//load in test file to have something in player when site loads
	  	scope.nowPlaying = ngAudio.load('/musicPlayer/tester.mp3')


	  	//keep volume consistent
	  	//needed due to volume resetting every time the audio object changed
	  	//this is inserted below into the watch function there
	  	scope.currentVolume = 1
	  	/////////IF HAVING PROBLEMS: check line 139 for ngaudioglobals, I set it to unlock (false) to stop audio from getting fucked up when changing pages


	  	//changes songs when they finish
	  	//makes sure song is playing
	  	/*scope.$watch(function(){return scope.nowPlaying}, 
	  		function(){*/

			  	scope.$watch(function(){return scope.nowPlaying.currentTime},
			  		function(){
			  			if ((scope.nowPlaying!=undefined) && (scope.nowPlaying!=null)){
			  				scope.nowPlaying.volume = scope.currentVolume
			  			}
			  			
			  			//this nowPlayingTrackNumber references the next track... actually, adding 1 will return object for current
			  			//checks if the currentTime is at the end of the song
			  			if (scope.nowPlaying.remaining==0){
			  				console.log('changing song...')
			  				console.log(nowPlayingList.nowPlayingTrackNumber)
			  				console.log(nowPlayingList.nowPlayingAlbum)
			  				console.log(nowPlayingList.nowPlayingAlbumTrackLength)
			  				//will then check if any other songs on the album...
			  				//if there are, then it will load the next song
			  				//checks if track which just finished is the same track number as the track length
			  				//if it is not, there are more tracks, so does operation
			  				if (nowPlayingList.nowPlayingAlbumLength != nowPlayingList.nowPlayingTrackNumber){
			  					console.log('next song!')
				  				
				  				nowPlayingList.nowPlayingTrack = nowPlayingList.nowPlayingAlbum.tracks[nowPlayingList.nowPlayingTrackNumber]
				  				nowPlayingList.nowPlayingTrackNumber = nowPlayingList.nowPlayingTrack.trackNumber
				  				nowPlayingList.nowPlayingChange = !nowPlayingList.nowPlayingChange

				  				
				  			} else {
				  				//when album ends, loads in the first song again and stops audio
				  				/*nowPlayingList.nowPlayingTrack = nowPlayingList.nowPlayingAlbum.tracks[0]
				  				nowPlayingList.nowPlayingTrackNumber = nowPlayingList.nowPlayingTrack.trackNumber
				  				scope.trackTitle=nowPlayingList.nowPlayingTrack.trackTitle
				  				scope.nowPlaying = ngAudio.load(nowPlayingList.nowPlayingTrack.sourceFile)
				  				scope.nowPlaying.restart()*/

				  				//or preferably, clears player and data
				  				console.log('album ended')
				  				scope.nowPlaying.restart()
				  				nowPlayingList.nowPlayingTrack = null
				  				//set a nowPlayingTrack on scope to assist queuedTrack function for player
				  				scope.nowPlayingTrack = nowPlayingList.nowPlayingTrack
									nowPlayingList.nowPlayingAlbum = null
									nowPlayingList.nowPlayingArtist= null
									scope.trackTitle=null
						  		scope.albumTitle=null
						  		scope.artistName=null
						  		scope.musicControllerAlbumArtPath =null
						  		scope.nowPlaying = ngAudio.load('')
			  				}
			  			}
			  		}
			  	)
/*		  	}
	  	)*/


	  	//sourcepath to use with file path in function
	  	const sourcePathBase = '/../backend/file-system/artists/'


	  	//SONG LOADER
	  	//watch now playing track to change to load next song
	  	scope.$watch(function(){return nowPlayingList.nowPlayingChange},
	  		function(){
	  			if (nowPlayingList.nowPlayingTrack != null){
	  				//if something was already playing (is defined already), stop playing
	  				if (scope.nowPlaying != undefined){
		  				//if the track is the same one already playing, restart and play again
		  				if (scope.nowPlaying.id === nowPlayingList.nowPlayingTrack.trackWavSource){
		  					scope.nowPlaying.currentTime=0
		  					if (scope.nowPlaying.paused === true){
		  						scope.nowPlaying.play()
		  					}
		  				} else {
		  				scope.nowPlaying.restart()
		  				const wavFilePath = sourcePathBase + nowPlayingList.nowPlayingTrack.trackWavSource
		  				//set album art path
		  				scope.musicControllerAlbumArtPath = '/../backend/file-system/artists/'+nowPlayingList.nowPlayingTrack.trackAlbumArt
		  				console.log(wavFilePath)
		  				//if first track playing, load the new track
			  			scope.nowPlaying = ngAudio.load(wavFilePath)
			  			//wait until the above is defined...
			  			scope.nowPlaying.play()

			  			//uses Track object to get new info  		
			  			scope.trackTitle=nowPlayingList.nowPlayingTrack.trackName
			  			scope.albumTitle=nowPlayingList.nowPlayingTrack.trackAlbum
			  			scope.artistName=nowPlayingList.nowPlayingTrack.trackArtist
			  			scope.musicControllerAlbumArtPath = '/../backend/file-system/artists/'+nowPlayingList.nowPlayingTrack.trackAlbumArt


			  			//for play button queue
			  			scope.nowPlayingTrack = nowPlayingList.nowPlayingTrack
			  			}
			  		} else {
			  			console.log(nowPlayingList.nowPlayingTrack)
			  			scope.musicControllerAlbumArtPath = '/../backend/file-system/artists/'+nowPlayingList.nowPlayingTrack.trackAlbumArt
			  			scope.nowPlaying = ngAudio.load(nowPlayingList.nowPlayingTrack.sourceFile)
			  			//wait until the above is defined...
			  			scope.nowPlaying.play()
			  			scope.trackTitle=nowPlayingList.nowPlayingTrack.trackName
			  			scope.albumTitle=nowPlayingList.nowPlayingTrack.trackAlbum
			  			scope.artistName=nowPlayingList.nowPlayingTrack.trackArtist
			  			scope.musicControllerAlbumArtPath = '/../backend/file-system/artists/'+nowPlayingList.nowPlayingTrack.trackAlbumArt

			  			//for play button queue
			  			scope.nowPlayingTrack = nowPlayingList.nowPlayingTrack
			  		}
			  	}
	  		}
	  	)

	  	scope.playQueuedTrack = function(){
	  		//sets current track to queued track, whatever it is
	  		//also sets now playing artist, now playing album
	  		console.log(nowPlayingList.queuedAlbum)
	  		console.log(nowPlayingList.queuedTrack)
	  		nowPlayingList.nowPlayingTrack = nowPlayingList.queuedTrack
	  		nowPlayingList.nowPlayingAlbum = nowPlayingList.queuedAlbum
	  		nowPlayingList.nowPlayingArtist = nowPlayingList.queuedArtist
	  		//update track number for "next track" mechanism
	  		nowPlayingList.nowPlayingTrackNumber = nowPlayingList.queuedTrack.trackNumber
	  		nowPlayingList.nowPlayingAlbumTrackLength = nowPlayingList.nowPlayingAlbum.tracks.length
	  		//send message to watcher
	  		nowPlayingList.nowPlayingChange = !nowPlayingList.nowPlayingChange

	  	}

	  	//goes to prior track
	  	scope.goToPreviousTrack = function(){
	  		//restarts track if current time is less than 3 seconds
	  		if (scope.nowPlaying.currentTime < 3){
	  			//if it is the first track then it stops playback and clears player
	  			if (nowPlayingList.nowPlayingTrack.trackNumber === 1){
	  				scope.nowPlaying.restart()
	  				nowPlayingList.nowPlayingTrack = null
	  				//set a nowPlayingTrack on scope to assist queuedTrack function for player
			  		scope.nowPlayingTrack = nowPlayingList.nowPlayingTrack
						nowPlayingList.nowPlayingAlbum = null
						nowPlayingList.nowPlayingArtist= null
						scope.trackTitle=null
			  		scope.albumTitle=null
			  		scope.artistName=null
			  		scope.albumCover =null
			  		scope.nowPlaying = ngAudio.load('')
			  	// otherwise goes to the previous track
	  			} else {
	  				console.log('to the previous track!')
		  			nowPlayingList.nowPlayingTrack = nowPlayingList.nowPlayingAlbum.tracks[nowPlayingList.nowPlayingTrack.trackNumber-2]
						scope.trackTitle=nowPlayingList.nowPlayingTrack.trackTitle
						//update track number for "next track" mechanism
			  		nowPlayingList.nowPlayingTrackNumber = nowPlayingList.nowPlayingTrack.trackNumber
			  		nowPlayingList.nowPlayingAlbumTrackLength = nowPlayingList.nowPlayingAlbum.tracks.length
						nowPlayingList.nowPlayingChange = !nowPlayingList.nowPlayingChange
		  		}
		  	}
	  		// otherwise if it is not less than 3 seconds, and presses back, simply restarts the track
	  		scope.nowPlaying.restart()
		  			$timeout(function(){
		  				scope.nowPlaying.play()}, 100)
			}
		  	
		  

	  	scope.goToNextTrack = function(){
	  		//checks if last track or not
	  		//if it is, shuts down the track
	  		if (nowPlayingList.nowPlayingTrack.trackNumber === nowPlayingList.nowPlayingAlbum.tracks.length){
	  			console.log('last track')
	  			scope.nowPlaying.restart()
  				nowPlayingList.nowPlayingTrack = null
  				//set a nowPlayingTrack on scope to assist queuedTrack function for player
			  	scope.nowPlayingTrack = nowPlayingList.nowPlayingTrack
					nowPlayingList.nowPlayingAlbum = null
					nowPlayingList.nowPlayingArtist= null
					scope.trackTitle=null
		  		scope.albumTitle=null
		  		scope.artistName=null
		  		scope.albumCover =null
		  		scope.nowPlaying = ngAudio.load('')
		  		//otherwise it will go to the next track
	  		} else {
	  			console.log('to the next track!')
	  			nowPlayingList.nowPlayingTrack = nowPlayingList.nowPlayingAlbum.tracks[nowPlayingList.nowPlayingTrack.trackNumber]
					scope.trackTitle=nowPlayingList.nowPlayingTrack.trackTitle
					//update track number for "next track" mechanism
		  		nowPlayingList.nowPlayingTrackNumber = nowPlayingList.nowPlayingTrack.trackNumber
		  		nowPlayingList.nowPlayingAlbumTrackLength = nowPlayingList.nowPlayingAlbum.tracks.length
					nowPlayingList.nowPlayingChange = !nowPlayingList.nowPlayingChange

	  		}

	  	}



	  	

	  	/*scope.$watch(function(){return nowPlayingList.nowPlayingTrack},
	  		function(){
	  			console.log('nowplayingtrack changed')
	  			scope.nowPlaying = ngAudio.load("assets/testAudio/slogo.wav")
	  			console.log(scope.nowPlaying)

	  		}
	  	)*/



	  },
	  controller: function(ngAudio){
	  	//pc = music controller
	  	var mc = this

	  }
	}
}])





.factory('nowPlayingList', function(){
	nowPlayingList = {}

	nowPlayingList.nowPlayingList = null

	nowPlayingList.volume = 1


	nowPlayingList.nowPlayingTrack = null
	nowPlayingList.nowPlayingAlbum = null
	nowPlayingList.nowPlayingArtist= null

	nowPlayingList.nowPlayingTrackNumber = null
	nowPlayingList.nowPlayingAlbumTrackLength = null

	nowPlayingList.nowPlayingChange = true
	

	nowPlayingList.queuedTrack = null
	nowPlayingList.queuedAlbum = null
	nowPlayingList.queuedArtist = null
	//on click:
	// adds album to the nowPlayingAlbum property
	// adds track to nowPlayingTrack property
	// loads that track into 



	return nowPlayingList
})