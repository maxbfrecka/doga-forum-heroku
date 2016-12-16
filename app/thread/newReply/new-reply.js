angular.module('newReply',[])

.directive('mxNewReply', [function(){
	return {
		restrict: 'E',
	  templateUrl: 'thread//newReply/new-reply.html',
	  scope: true,
	  transclude: true,
	  link: function(scope, element, attrs){
	  	
	  }
  }
}])


