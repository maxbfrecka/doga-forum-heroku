angular.module('rID',[])

.directive('mxRID', function(){
	return {
		restrict: 'E',
	  templateUrl: 'rID/rID.html',
	  scope: true,
	  transclude: true,
	  link: function(scope, element, attrs){

	  }
  }
})