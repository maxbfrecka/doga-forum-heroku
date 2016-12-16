angular.module('browse',[])
.directive('mxBrowse', ['ngAudio', 'browseTestData', 'nowPlayingList', function(ngAudio, browseTestData, nowPlayingList){
	return {
		restrict: 'E',
	  templateUrl: 'browse/browse.html',
	  scope: {},
	  transclude: true,
	  controllerAs: "bc",
	  link: function(scope, element, attrs){
	  	//simply start play method from nothing, will need modifying
	  	nowPlayingList.queuedAlbum = browseTestData.artists[0].albums[0]
			nowPlayingList.queuedArtist = browseTestData.artists[0]
			nowPlayingList.queuedTrack = browseTestData.artists[0].albums[0].tracks[0]


	  },
	  controller: function(ngAudio){
	  	var bc = this
	  	bc.artists = browseTestData.artists
	  }
	}
}])








.factory('browseTestData', function(){
	browseTestData = {}

	browseTestData.artists = [
		{
			artist: 'Banzaei',
			albums: [
					{
					albumTitle: 'Sharp Metal',
					albumCover: 'https://f4.bcbits.com/img/a1946274968_10.jpg',
					tracks: [
						{
							trackNumber: 1,
							trackTitle: 'Hard Ribbons',
							sourceFile: 'assets/testAudio/beatbeat1.wav',
						},
						{
							trackNumber: 2,
							trackTitle: 'Truck Bump',
							sourceFile: 'assets/testAudio/beatproduction.wav'
						},
						{
							trackNumber: 3,
							trackTitle: 'Beetles With Folk Sauce',
							sourceFile: 'assets/testAudio/banzaeifolkrock.wav'
						},
						{
							trackNumber: 4,
							trackTitle: 'Soundog Handy Kaloo',
							sourceFile: 'assets/testAudio/soundog.wav'
						},
						{
							trackNumber: 5,
							trackTitle: 'Kob Log',
							sourceFile: 'assets/testAudio/beatup.wav'
						}
					]
				},
				{
					albumTitle: 'Jess Onu and Free Standing',
					albumCover: 'https://f4.bcbits.com/img/a3955062675_10.jpg',
					tracks: [
						{
							trackNumber: 1,
							trackTitle: 'Breaking Waves',
							sourceFile: 'assets/testAudio/breakot1.wav'
						},
						{
							trackNumber: 2,
							trackTitle: 'Inite Oproduct',
							sourceFile: 'assets/testAudio/slogo.wav'
						},
						{
							trackNumber: 3,
							trackTitle: 'New Even Button Jug',
							sourceFile: 'assets/testAudio/tryIT.wav'
						},
						{
							trackNumber: 4,
							trackTitle: 'Git Dat',
							sourceFile: 'assets/testAudio/HARDER.wav'
						}
					]
				}
			]
		}
	]

	browseTestData.currentArtistName = null
	browseTestData.currentAlbumName = null
	browseTestData.currentArtist = null


	return browseTestData





})