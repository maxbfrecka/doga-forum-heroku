angular.module('threadPreview',[])

.directive('mxThreadPreview', ['threadData', 'replyCounter', 'replyData', function(threadData, replyCounter, replyData){
	return {
		restrict: 'E',
	  templateUrl: 'catalog/threadPreview/thread-preview.html',
	  scope: true,
	  transclude: true,
	  link: function(scope, element, attrs){
	  	scope.threads = threadData.threads;
	  	scope.replies = replyData.replies


	  	//to get reply count number...
	  	scope.replies.$loaded(function(){
		  	scope.getReplyCount = replyCounter.getReplyCount

		  	//individual reply count
		  	scope.replyCount = scope.getReplyCount(scope.thread, scope.replies)

		  	//get reply counts into array
		  	scope.allReplyCounts = replyCounter.allReplyCounts
		  	scope.allReplyCounts.push(scope.replyCount)

		  	//find maximum reply count [eventually can also calculate average, need stats to do this]
		  	Array.max = function(array){
	    		return Math.max.apply( Math, array );
				};
		  	scope.maximumReplyCount = Array.max(scope.allReplyCounts)
		  	/*console.log('the biggest reply count is' + scope.maximumReplyCount)*/

		  	//calculate ratio of thread reply count compared to the maximum
		  	if (scope.replyCount > 0){
		  		scope.replyRatio = Math.round(((scope.replyCount/scope.maximumReplyCount)*10))} else {
		  			scope.replyRatio=0;
		  		}

		  	//calculate colors
		  	if (scope.replyRatio === 0){scope.replyColor='#ffffff'} 
		  		else if (scope.replyRatio === 1){scope.replyColor='#e9fee7'}
		  			else if (scope.replyRatio === 2){scope.replyColor='#d2fdce'}
		  				else if (scope.replyRatio === 3){scope.replyColor='#bcfcb6'}
		  					else if (scope.replyRatio === 4){scope.replyColor='#b0fba9'}
		  						else if (scope.replyRatio === 5){scope.replyColor='#a5fa9e'}
		  							else if (scope.replyRatio === 6){scope.replyColor='#8ff985'}
		  								else if (scope.replyRatio === 7){scope.replyColor='#78f86d'}
		  									else if (scope.replyRatio === 8){scope.replyColor='#62f755'}
		  										else if (scope.replyRatio === 9){scope.replyColor='#4cf63c'}
		  											else if (scope.replyRatio === 10){scope.replyColor='#1ff40b'}
	  	})






		}
  }
}])



/*
-each thread/reply has a datesort on it
-sort thread previews by datesort


*/

.factory('replyCounter', function(){
	var replyCounter = {}

	replyCounter.allReplyCounts = []

	replyCounter.getReplyCount = function(thread, replies){
		//to find replies and their times into currentreplies array
		function searchForReplies(_thread, _replyArray){
			var array = []
	    for (var i=0; i < _replyArray.length; i++) {
	        if (_replyArray[i].OPID === _thread.OPID) {
	            array.push(_replyArray[i]);
	        }
	    }

	    return array
	  }
	  var currentreplies = searchForReplies(thread, replies)

	  return currentreplies.length
	}

	return replyCounter


})