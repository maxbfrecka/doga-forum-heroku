angular.module('navigationBar', [])
.directive('mxNavigationBar', ['ngAudio', 'nowPlayingList', 'browseTestData', 'libraryData', '$http', 'Upload', 'artistData', '$routeParams', '$location', 'addAlbumData', 'albumData', function(ngAudio, nowPlayingList, browseTestData, libraryData, $http, Upload, artistData, $routeParams, $location, addAlbumData, albumData){
	return {
		restrict: 'E',
	  templateUrl: 'navigationBar/navigationBar.html',
	  scope: {},
	  transclude: true,
	  controllerAs: "nbc",
	  
	  link: function(scope, element, attrs){
	  	scope.navColor0 = randomRGBcolor()
	  	scope.navColor1 = randomRGBcolor()
	  	scope.navColor2 = randomRGBcolor()
	  	scope.navColor3 = randomRGBcolor()
	  	scope.navColor4 = randomRGBcolor()
	  	scope.navColor5 = randomRGBcolor()
	  	scope.navColor6 = randomRGBcolor()
	  	scope.navColor7 = randomRGBcolor()
	  	scope.navColor8 = randomRGBcolor()
	  	scope.navColor9 = randomRGBcolor()
	  	scope.navColor10 = randomRGBcolor()
	  	scope.navColor11 = randomRGBcolor()
	  	scope.navColor12 = randomRGBcolor()
	  	scope.navColor13 = randomRGBcolor()
	  	scope.navColor14 = randomRGBcolor()
	  	scope.navColor15 = randomRGBcolor()
	  	scope.navColor16 = randomRGBcolor()
	  	scope.navColor17 = randomRGBcolor()
	  	scope.navColor18 = randomRGBcolor()
	  	scope.navColor19 = randomRGBcolor()


			

	  },

	  controller: function(){
	  }
	}
}])


/*.factory('albumData', ['$http', '$q', function($http, $q){

}])*/






