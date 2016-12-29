angular.module('signUp',[])
.directive('mxSignUp', ['$http', function($http){
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
		  		var request = {
	        	username: scope.newUsername,
	        	password: scope.newPasswordA
	      	}
	      	return $http.post('/../api/signUp', {method: 'JSON', params:request});
    		} else {
    			//set passwordCheck to alert user that passwords do not patch
    			scope.passwordCheck=1
    		}
		  }



		}
	}
}])