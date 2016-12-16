angular.module('thread',[])

.directive('mxThread', ['testData', '$routeParams', 'newReplyClick', 'threadData', 'replyData', '$location', '$timeout', '$interval', function(testData, $routeParams, newReplyClick, threadData, replyData, $location, $timeout, $interval){
	return {
		restrict: 'E',
	  templateUrl: 'thread/thread.html',
	  scope: true,
	  transclude: true,
	  controllerAs: "tc",
	  link: function(scope,element,attrs){

	  	//scrolls to top on load
	  	window.scrollTo(0, 0)
	  		  	
	  },
	  controller: function($location, $scope){
	  	var tc = this;

	  	//get to top of page:


	  	//data for thread/replies
	  	tc.threads = threadData.threads;
	  	tc.replies = replyData.replies;
	
	  	//gets thread info from URL and finds thread based on OPID
	  	console.log('routeparams ID is ' + $routeParams.ID)
	  	threadData.currentID = $routeParams.ID;
	  	tc.currentID = threadData.currentID
	  	threadData.currentThread = tc.threads.filter(function(obj) {
    		return obj.OPID === tc.currentID;

			})[0];
			tc.thread = threadData.currentThread;
			console.log(tc.thread)

			tc.threads

			//locates replies for this thread...
			function search(nameKey, myArray){
				var array = []
		    for (var i=0; i < myArray.length; i++) {
		        if (myArray[i].OPID === nameKey) {
		            array.push(myArray[i]);
		        }
		    }
		    return array
			}
			tc.currentReplies = search(tc.currentID, tc.replies);
			console.log(tc.currentReplies)

			tc.threads.$loaded(function(){
				threadData.currentThread = tc.threads.filter(function(obj) {
	    		return obj.OPID === tc.currentID;
					})[0];
				tc.thread = threadData.currentThread;
			})
			tc.replies.$loaded(function(){
				tc.currentReplies = search(tc.currentID, tc.replies);
			})
			
			//watches replies to update when a user makes a new reply
			$scope.$watch(function(){return replyData.replies},function(){
 				console.log('replies changed')
 				function search(nameKey, myArray){
				var array = []
		    for (var i=0; i < myArray.length; i++) {
		        if (myArray[i].OPID === nameKey) {
		            array.push(myArray[i]);
		        }
		    }
		    return array
				}
				tc.currentReplies = search(tc.currentID, tc.replies)

				//this function might be stupid, eventually needs to be rethought
				//I'm using an interval to make sure the replies update when a new one is made
				//had trouble with the scope or something
				$interval(function() {tc.currentReplies = search(tc.currentID, tc.replies)
				}, 500)
				
 			})


			//the function for adding a reply
      tc.newReply = function(send){

          // do some validation
          if ( !send.reply ) {
          	console.log("nothing happened"); 
          	return false;
          }
          else {
          // save the thread
            console.log('REPLY might be')
            //array of threads containing thread objects
            //thread object contains array of posts
            // threads[0] selects the first thread
            // threads[0].posts[0] is the OP and also URL
            //array of posts inside of each thread

						//assists in moving page to correct ID at bottom
						newReplyID = make_randID()

            tc.replies.$add(
            {
            		OPID: tc.currentID,
                ID: newReplyID,
                userName: 'anonymous',
                datetime: post_time(),
                datesort: new Date().getTime(),
                content: send.reply.trim(),
                rID1bg: randomRGBcolor(),
                rID2bg: randomRGBcolor(),
                rID3bg: randomRGBcolor(),
                rID4bg: randomRGBcolor(),
                rID5bg: randomRGBcolor(),
                rID6bg: randomRGBcolor(),
                rID7bg: randomRGBcolor(),
                rID8bg: randomRGBcolor(),
                rID1t: randomRGBcolor(),
                rID2t: randomRGBcolor(),
                rID3t: randomRGBcolor(),
                rID4t: randomRGBcolor(),
                rID5t: randomRGBcolor(),
                rID6t: randomRGBcolor(),
                rID7t: randomRGBcolor(),
                rID8t: randomRGBcolor(),
                image: tc.sendImage || ''
           	});

            send.reply = '';
            
            tc.replies.$loaded(function(){
							tc.currentReplies = search(tc.currentID, tc.replies);
							console.log(tc.currentReplies)

							//scroll to the bottom
							tc.goToReply = function(id) {
						      // set the location.hash to the id of
						      // the element you wish to scroll to.
						      console.log("woring")
						      var old = $location.hash();
							    $location.hash(id);
							    $anchorScroll();
							    $location.hash(old);
						  }
						  tc.goToReply(newReplyID)

						})
          }
      };

			//for show and hide post
			tc.newReplyClick = newReplyClick.if
			tc.newReplyClickImage = newReplyClick.ifImage
	  
	  }
  }

}])

.factory('replyData', ['$firebaseArray', function($firebaseArray){
	var replyData = {}
	var ref = firebase.database().ref('replies');
	replyData.replies = $firebaseArray(ref);
	return replyData
}])


.factory('newReplyClick',function(){
	var newReplyClick = {}

	newReplyClick.if = false
	newReplyClick.ifImage = false


	return newReplyClick
})