angular.module('navigationBar', [])
.directive('mxNavigationBar', ['ngAudio', 'nowPlayingList', 'browseTestData', 'libraryData', '$http', 'Upload', 'artistData', '$routeParams', '$location', 'addAlbumData', 'albumData', 'auth', 'colorSet', '$localStorage', function(ngAudio, nowPlayingList, browseTestData, libraryData, $http, Upload, artistData, $routeParams, $location, addAlbumData, albumData, auth, colorSet, $localStorage){
	return {
		restrict: 'E',
	  templateUrl: 'navigationBar/navigationBar.html',
	  scope: {},
	  transclude: true,
	  controllerAs: "nbc",
	  
	  link: function(scope, element, attrs){

	  	scope.isLogged = $localStorage.isLogged
	  	scope.username = $localStorage.username

	  	scope.$watch(function(){return $localStorage.isLogged},
	  		function(){
	  			scope.isLogged = $localStorage.isLogged
	  			scope.username = $localStorage.username
	  		}
	  	)

	  	scope.logOut = function(){
	  		auth.logOut()
	  		colorSet.setNavColors()
	  	}

	  	scope.navColor0 = colorSet.navColor0
	  	scope.navColor1 = colorSet.navColor1
	  	scope.navColor2 = colorSet.navColor2
	  	scope.navColor3 = colorSet.navColor3
	  	scope.navColor4 = colorSet.navColor4
	  	scope.navColor5 = colorSet.navColor5
	  	scope.navColor6 = colorSet.navColor6
	  	scope.navColor7 = colorSet.navColor7
	  	scope.navColor8 = colorSet.navColor8
	  	scope.navColor9 = colorSet.navColor9
	  	scope.navColor10 = colorSet.navColor10
	  	scope.navColor11 = colorSet.navColor11
	  	scope.navColor12 = colorSet.navColor12
	  	scope.navColor13 = colorSet.navColor13
	  	scope.navColor14 = colorSet.navColor14
	  	scope.navColor15 = colorSet.navColor15
	  	scope.navColor16 = colorSet.navColor16
	  	scope.navColor17 = colorSet.navColor17
	  	scope.navColor18 = colorSet.navColor18
	  	scope.navColor19 = colorSet.navColor19

	  	scope.$watch(function(){return colorSet.navColorChange},
	  		function(){
			  	scope.navColor0 = colorSet.navColor0
			  	scope.navColor1 = colorSet.navColor1
			  	scope.navColor2 = colorSet.navColor2
			  	scope.navColor3 = colorSet.navColor3
			  	scope.navColor4 = colorSet.navColor4
			  	scope.navColor5 = colorSet.navColor5
			  	scope.navColor6 = colorSet.navColor6
			  	scope.navColor7 = colorSet.navColor7
			  	scope.navColor8 = colorSet.navColor8
			  	scope.navColor9 = colorSet.navColor9
			  	scope.navColor10 = colorSet.navColor10
			  	scope.navColor11 = colorSet.navColor11
			  	scope.navColor12 = colorSet.navColor12
			  	scope.navColor13 = colorSet.navColor13
			  	scope.navColor14 = colorSet.navColor14
			  	scope.navColor15 = colorSet.navColor15
			  	scope.navColor16 = colorSet.navColor16
			  	scope.navColor17 = colorSet.navColor17
			  	scope.navColor18 = colorSet.navColor18
			  	scope.navColor19 = colorSet.navColor19
	  		}
	  	)




	  	//color system
	  /*	scope.navColor0 = randomRGBcolor()
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
	  	scope.navColor19 = randomRGBcolor()*/


	  },

	  controller: function(){
	  }
	}
}])


.factory('colorSet', [function(){
	colorSet = {}

	colorSet.navColorChange = false

	colorSet.navColor0 = randomRGBcolor()
	colorSet.navColor1 = randomRGBcolor()
	colorSet.navColor2 = randomRGBcolor()
	colorSet.navColor3 = randomRGBcolor()
	colorSet.navColor4 = randomRGBcolor()
	colorSet.navColor5 = randomRGBcolor()
	colorSet.navColor6 = randomRGBcolor()
	colorSet.navColor7 = randomRGBcolor()
	colorSet.navColor8 = randomRGBcolor()
	colorSet.navColor9 = randomRGBcolor()
	colorSet.navColor10 = randomRGBcolor()
	colorSet.navColor11 = randomRGBcolor()
	colorSet.navColor12 = randomRGBcolor()
	colorSet.navColor13 = randomRGBcolor()
	colorSet.navColor14 = randomRGBcolor()
	colorSet.navColor15 = randomRGBcolor()
	colorSet.navColor16 = randomRGBcolor()
	colorSet.navColor17 = randomRGBcolor()
	colorSet.navColor18 = randomRGBcolor()
	colorSet.navColor19 = randomRGBcolor()

	colorSet.setNavColors = function(){
		console.log('firing colorsetnav')
		colorSet.navColor0 = randomRGBcolor()
		colorSet.navColor1 = randomRGBcolor()
		colorSet.navColor2 = randomRGBcolor()
		colorSet.navColor3 = randomRGBcolor()
		colorSet.navColor4 = randomRGBcolor()
		colorSet.navColor5 = randomRGBcolor()
		colorSet.navColor6 = randomRGBcolor()
		colorSet.navColor7 = randomRGBcolor()
		colorSet.navColor8 = randomRGBcolor()
		colorSet.navColor9 = randomRGBcolor()
		colorSet.navColor10 = randomRGBcolor()
		colorSet.navColor11 = randomRGBcolor()
		colorSet.navColor12 = randomRGBcolor()
		colorSet.navColor13 = randomRGBcolor()
		colorSet.navColor14 = randomRGBcolor()
		colorSet.navColor15 = randomRGBcolor()
		colorSet.navColor16 = randomRGBcolor()
		colorSet.navColor17 = randomRGBcolor()
		colorSet.navColor18 = randomRGBcolor()
		colorSet.navColor19 = randomRGBcolor()
		colorSet.navColorChange = !colorSet.navColorChange
	}

	return colorSet
}])






