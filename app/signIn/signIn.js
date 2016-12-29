angular.module('signIn',[])
.directive('mxSignIn', ['$location', '$http', function($location, $http){
	return {
		restrict: 'E',
	  templateUrl: 'signIn/signIn.html',
	  scope: {},
	  transclude: true,
	  controllerAs: "sic",
	  link: function(scope, element, attrs){

	  	scope.signIn = function() {
      	var dataObj = {
						username : scope.username,
						password : scope.password
				}
				var res = $http.post('../api/users/signIn', dataObj);
				res.success(function(data, status, headers, config) {
					scope.message = data;
					console.log(data)
					// $location.path('/');
				});
				res.error(function(data, status, headers, config) {
					alert( "failure message: " + JSON.stringify({data: data}));
				});
  		}





	  	
	  }
	}
}])