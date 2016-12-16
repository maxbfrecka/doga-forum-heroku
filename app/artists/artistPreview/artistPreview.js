angular.module('artistPreview',[])
.directive('mxArtistPreview', ['ngAudio', 'nowPlayingList', 'browseTestData', 'libraryData', '$http', 'Upload', function(ngAudio, nowPlayingList, browseTestData, libraryData, $http, Upload){
	return {
		restrict: 'E',
	  templateUrl: 'artists/artistPreview/artistPreview.html',
	  scope: {},
	  transclude: true,
	  controllerAs: "apc",
	  
	  link: function(scope, element, attrs){

	  	


    };








	  },

	  controller: function(){
	  }
	}
}])