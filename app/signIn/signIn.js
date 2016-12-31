angular.module('signIn',[])
.directive('mxSignIn', ['$location', '$http', '$localStorage', '$sessionStorage', 'auth', 'colorSet', function($location, $http, $localStorage, $sessionStorage, auth, colorSet){
	return {
		restrict: 'E',
	  templateUrl: 'signIn/signIn.html',
	  scope: {},
	  transclude: true,
	  controllerAs: "sic",
	  link: function(scope, element, attrs){

	  	scope.signIn = function(username, password){
	  		console.log('THE INFO SENT:')
	  		console.log(username, password)
	  		auth.signIn(username,password)
	  		console.log('try to sign in')
	  		console.log($localStorage.isLogged)
	  		console.log($localStorage.username)
	  		console.log(auth.isLogged)
	  		console.log(auth.username)
	  		colorSet.setNavColors()
	  	}

	  }
	}
}])



.factory('auth', ['$localStorage', '$sessionStorage', '$http', '$location', function($localStorage, $sessionStorage, $http, $location){
	auth = {}

	$localStorage.isLogged = false
	$localStorage.username = ''
	auth.isLogged = $localStorage.isLogged
	auth.username = $localStorage.username

	auth.setAuth = function(){
		auth.isLogged = $localStorage.isLogged
		auth.username = $localStorage.username
	}

	auth.signIn = function(username, password){
		console.log('in auth')
		var dataObj = {
			username : username,
			password : password
		}
		var res = $http.post('../api/users/signIn', dataObj);
		res.success(function(data, status, headers, config) {
			console.log(data)
			//$location.path('/');
			$localStorage.isLogged = true
			$localStorage.username = username
			auth.setAuth()
		});
		res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});
	}

	auth.logOut = function(){
		$localStorage.isLogged = false
		$localStorage.username = ''
		auth.setAuth()
	}


	return auth
}])