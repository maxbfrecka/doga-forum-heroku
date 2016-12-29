angular.module('signUp',[])
.directive('mxSignUp', ['$http', '$location', function($http, $location){
	return {
		restrict: 'E',
	  templateUrl: 'signUp/signUp.html',
	  scope: {},
	  transclude: true,
	  controllerAs: "suc",
	  link: function(scope, element, attrs){

	  	scope.passwordCheck=0

	  	scope.signUp = function() {
	  		if (scope.newPasswordA===scope.newPasswordB){
	      	var dataObj = {
							username : scope.newUsername,
							password : scope.newPasswordA
					}
					var res = $http.post('../api/users/signUp', dataObj);
					res.success(function(data, status, headers, config) {
						scope.message = data;
						$location.path('/');
					});
					res.error(function(data, status, headers, config) {
						alert( "failure message: " + JSON.stringify({data: data}));
					});

    		} else {
    			//set passwordCheck to alert user that passwords do not patch
    			scope.passwordCheck=1
    		}
		  }



		}
	}
}])