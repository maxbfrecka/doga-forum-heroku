angular.module('musicPlayer',[])
.directive('mxMusicPlayer', ['ngAudio', function(ngAudio){
	return {
		restrict: 'E',
	  templateUrl: 'musicPlayer/musicPlayer.html',
	  scope: {},
	  transclude: true,
	  controllerAs: "pc",
	  link: function(scope, element, attrs){

	  },
	  controller: function(ngAudio){
	  	//pc = player controller
	  	var pc = this





	  	//when time remaining = 0 go to next item in array


	  }
	}
}])









