angular.module('views', ['ngRoute'])
	.config(['$routeProvider',  function($routeProvider){
	  $routeProvider.when('/catalog/', {
	    templateUrl: 'views/main.html'
	  })
	  .when('/library/', {
	  	templateUrl: 'views/myLibrary.html',
	  	controller: 'myLibraryController'
	  })
	  .when('/catalog/:ID', {
	  	templateUrl: 'views/thread.html',
	  	controller: 'threadController'
	  })
	  .when('/canvas/', {
	  	templateUrl: 'views/canvastest.html',
	  	controller: 'canvasController'
	  })
	  .when('/browse/', {
	  	templateUrl: 'views/browse.html',
	  	controller: 'browseController'
	  })
	  .when('/artists/:artist/:album', {
	  	templateUrl: 'views/album.html',
	  	controller: 'albumController'
	  })
	  .when('/createAlbum/', {
	  	templateUrl: 'views/createAlbum.html',
	  	controller: 'createAlbumController'
	  })
	  .when('/login/', {
	  	templateUrl: 'views/login.html',
	  	controller: 'loginController'
	  })
	  .when('/signup/', {
	  	templateUrl: 'views/signUp.html',
	  	controller: 'signUpController'
	  })
	  .when('/createArtist/', {
	  	templateUrl: 'views/createArtist.html',
	  	controller: 'createArtistController'
	  })
	  .when('/artists/', {
	  	templateUrl: 'views/artists.html',
	  	controller: 'artistsController'
	  })
	  .when('/artists/:artist', {
	  	templateUrl: 'views/artist.html',
	  	controller: 'artistController'
	  })
	  .when('/error', {
	    template : '<p>Error - Page Not Found</p>'
	  })
	  .otherwise('/error');

  }])
  .run(['$rootScope', '$location', function($rootScope, $location) {
	  $rootScope.$on('$routeChangeError', function() {
	    $location.path('/error');
	  });
}])

.controller('threadController', ['$scope', '$routeParams', 'testData', function($scope, $routeParams, testData){
	$scope.threads = testData.threads;
	console.log("route is" + $scope.threads[$routeParams.ID])
}])
.controller('canvasController', ['$scope', 'testData', 'threadData', function($scope, testData, threadData){
	$scope.threads = testData.threads;
	$scope.threadData = threadData.threads
}])
.controller('browseController', ['$scope', 'browseTestData', function($scope, browseTestData){
}])
.controller('albumController', ['$scope', 'browseTestData', function($scope, browseTestData){
	$scope.artists = browseTestData.artists
}])
.controller('myLibraryController', ['browseTestData', function($scope, browseTestData){
}])
.controller('createAlbumController', ['browseTestData', function($scope, browseTestData){
}])
.controller('loginController', ['browseTestData', function($scope, browseTestData){
}])
.controller('signUpController', ['browseTestData', function($scope, browseTestData){
}])
.controller('createArtistController', ['browseTestData', function($scope, browseTestData){
}])
.controller('artistsController', ['browseTestData', function($scope, browseTestData){
}])
.controller('artistController', ['browseTestData', function($scope, browseTestData){
}])