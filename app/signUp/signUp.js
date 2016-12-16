angular.module('signUp',[])
.directive('mxSignUp', ['ngAudio', 'browseTestData', '$routeParams', '$location', 'nowPlayingList', 'libraryData', '$timeout', function(ngAudio, browseTestData, $routeParams, $location, nowPlayingList, libraryData, $timeout){
	return {
		restrict: 'E',
	  templateUrl: 'signUp/signUp.html',
	  scope: {},
	  transclude: true,
	  controllerAs: "suc",
	  link: function(scope, element, attrs){


	  	
	  }
	}
}])