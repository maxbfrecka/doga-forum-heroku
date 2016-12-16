angular.module('login',[])
.directive('mxLogin', ['ngAudio', 'browseTestData', '$routeParams', '$location', 'nowPlayingList', 'libraryData', '$timeout', function(ngAudio, browseTestData, $routeParams, $location, nowPlayingList, libraryData, $timeout){
	return {
		restrict: 'E',
	  templateUrl: 'login/login.html',
	  scope: {},
	  transclude: true,
	  controllerAs: "lic",
	  link: function(scope, element, attrs){


	  	
	  }
	}
}])