angular.module('catalog',[])

.directive('mxCatalog', ['newPostClick', 'threadData', 'canvasDataTest', 'replyData', function(newPostClick, threadData, canvasDataTest, replyData){
	return {
		restrict: 'E',
	  templateUrl: 'catalog/catalog.html',
	  scope: true,
	  transclude: true,
	  link: function(scope, element, attrs){
	  	scope.threads = threadData.threads
	  	scope.replies = replyData.replies


	  	scope.newPostClick = newPostClick.if
	  	scope.newPostClickImage = newPostClick.ifImage

	  	scope.postTime = post_time()
	  	







	  	//the sortBy filter for making sure newest post on top
	  	scope.SortFunctionTest = function(thread){
	  		//reply array
	  		var replies = scope.replies

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
			  //checks if replies exist, if they do then it finds the newest one, then checks against thread time
			  //returns fastest of the two
			  if (currentreplies.length > 0){
					var res = Math.max.apply(Math,currentreplies.map(function(o){return o.datesort;}))
					if (res > thread.posts[0].datesortMain){
						return res
					}
				}
				return thread.posts[0].datesortMain
				
	  	}
	  }
  }
}])





.factory('newPostClick',function(){
	var newPostClick = {}

	newPostClick.if = false

	newPostClick.ifImage = false

	return newPostClick
})

.factory('threadData', ['$firebaseArray', function($firebaseArray){
	var threadData = {}	
	var ref = firebase.database().ref('threads');

	threadData.threads = $firebaseArray(ref);
	
	threadData.currentID = null
	threadData.currentThread = null

	threadData

	return threadData

}])























.factory('testData', function(){
	var testData = {}
	testData.threads = [
		{
			number: 1,
			title: 'cool thread',
			move_1: 10,
			OP: 'anonymous',
			summary: 'this is something I did today I am happy!',
			ID: 'XADRPOA',
			postTime: post_time(),
			randomColor: randomRGBcolor(),
			img: "http://www.yeepet.com/blog_image/201105/BlogImg1_1306299013.jpg"
			// rID is generated and attached in full
			// is split into 8 inside of the view not in here
			// random colors are generated on post and attached to data object sequentially
			// background and foreground
			// scope.thread.rID1bg rID1c etc
			// puts that into STYLE attributes inside of the directive template
			// when reply, uses that data and copies the HTML
			// how do replies work? - > clicks on post to reply...
			// adds the tag to new reply box with tags
		},
		{
			number: 2,
			title: 'nice times',
			move_1: 10,
			move_2:20,
			OP: 'anonymous',
			summary: 'asf is asdf I did asdfsadfa I am happy!',
			ID: 'ARAOPSO',
			postTime: post_time(),
			randomColor: randomRGBcolor(),
			img: "https://a2-images.myspacecdn.com/images03/30/e1845dc3c59e423299531741aa8e857d/300x300.jpg"
		},
		{
			number: 3,
			title: 'blah blah blah',
			move_1: 20,
			move_2:34,
			OP: 'John John',
			summary: 'OK YALL I AM SO HAPY ABOUT THESE THREADS!!!!',
			ID: 'FAREAREAFE',
			postTime: post_time(),
			randomColor: randomRGBcolor(),
			img: "http://public.media.smithsonianmag.com/legacy_blog/jack-o-lantern.jpg"
		},
		{
			number: 4,
			title: 'okkkkkkkkkk',
			move_1: 30,
			move_2: 16,
			OP: 'Sally Henry',
			summary: 'hello I am a girl and we love your site!',
			ID: 'DADADADADA',
			postTime: post_time(),
			randomColor: randomRGBcolor(),
			img: "http://jayarmstronggames.com/jagwp/wp-content/uploads/2012/11/Screen-shot-2012-11-21-at-19.32.50.png"
		},
		{
			number: 5,
			title: 'cool thread',
			move_1: 40,
			move_2: 55,
			OP: 'anonymous',
			summary: 'this is something I did today I am happy!',
			ID: 'XADBRPOA',
			postTime: post_time(),
			randomColor: randomRGBcolor(),
			img: "http://www.k9healthcentre.com/img/dog_running.jpg"
		},
		{
			number: 6,
			title: 'nice times',
			OP: 'anonymous',
			summary: 'asf is asdf I did asdfsadfa I am happy!',
			ID: 'ARAOPHSO',
			postTime: post_time(),
			randomColor: randomRGBcolor(),
			img: "http://jayarmstronggames.com/jagwp/wp-content/uploads/2012/11/Screen-shot-2012-11-21-at-19.32.50.png"
		},
		{
			number: 7,
			title: 'blah blah blah',
			OP: 'John John',
			summary: 'OK YALL I AM SO HAPY ABOUT THESE THREADS!!!!',
			ID: 'FAREARREAFE',
			postTime: post_time(),
			randomColor: randomRGBcolor(),
			img: "http://www.k9healthcentre.com/img/dog_running.jpg"
		},
		{
			number: 8,
			title: 'okkkkkkkkkk',
			OP: 'Sally Henry',
			summary: 'hello I am a girl and we love your site!',
			ID: 'DADADADAFDA',
			postTime: post_time(),
			randomColor: randomRGBcolor(),
			img: "http://www.k9healthcentre.com/img/dog_running.jpg"
		},
		{
			number: 1,
			title: 'cool thread',
			OP: 'anonymous',
			summary: 'this is something I did today I am happy!',
			ID: 'XADRPRROA',
			postTime: post_time(),
			randomColor: randomRGBcolor(),
			img: "http://www.k9healthcentre.com/img/dog_running.jpg"
		},
		{
			number: 2,
			title: 'nice times',
			OP: 'anonymous',
			summary: 'asf is asdf I did asdfsadfa I am happy!',
			ID: 'ARAOTPSO',
			postTime: post_time(),
			randomColor: randomRGBcolor(),
			img: "http://www.k9healthcentre.com/img/dog_running.jpg"
		},
		{
			number: 3,
			title: 'blah blah blah',
			OP: 'John John',
			summary: 'OK YALL I AM SO HAPY ABOUT THESE THREADS!!!!',
			ID: 'FAREARWWEAFE',
			postTime: post_time(),
			randomColor: randomRGBcolor(),
			img: "http://www.k9healthcentre.com/img/dog_running.jpg"
		},
		{
			number: 4,
			title: 'okkkkkkkkkk',
			OP: 'Sally Henry',
			summary: 'hello I am a girl and we love your site!',
			ID: 'DADADADQQADA',
			postTime: post_time(),
			randomColor: randomRGBcolor(),
			img: "http://www.k9healthcentre.com/img/dog_running.jpg"
		},
		{
			number: 5,
			title: 'cool thread',
			move_1: 30,
			move_2: 5,
			OP: 'anonymous',
			summary: 'this is something I did today I am happy!',
			ID: 'XADRPEREOA',
			postTime: post_time(),
			randomColor: randomRGBcolor(),
			img: "http://www.k9healthcentre.com/img/dog_running.jpg"
		},
		{
			number: 6,
			title: 'nice times',
			OP: 'anonymous',
			summary: 'asf is asdf I did asdfsadfa I am happy!',
			ID: 'ARAOPSAAO',
			postTime: post_time(),
			randomColor: randomRGBcolor(),
			img: "http://www.k9healthcentre.com/img/dog_running.jpg"
		},
		{
			number: 7,
			title: 'blah blah blah',
			OP: 'John John',
			summary: 'OK YALL I AM SO HAPY ABOUT THESE THREADS!!!!',
			ID: 'FQWEAREAREAFE',
			postTime: post_time(),
			randomColor: randomRGBcolor(),
			img: "http://www.k9healthcentre.com/img/dog_running.jpg"
		},
		{
			number: 8,
			title: 'okkkkkkkkkk',
			OP: 'Sally Henry',
			summary: 'hello I am a girl and we love your site!',
			ID: 'DADADUPADADA',
			postTime: post_time(),
			randomColor: randomRGBcolor(),
			img: "http://www.k9healthcentre.com/img/dog_running.jpg"
		},
		{
			number: 8,
			title: 'okkkkkkkkkk',
			OP: 'Sally Henry',
			summary: 'hello I am a girl and we love your site!',
			ID: 'DADADAGGGGGGDADA',
			postTime: post_time(),
			randomColor: randomRGBcolor(),
			img: "http://www.k9healthcentre.com/img/dog_running.jpg"
		},
		{
			number: 8,
			title: 'okkkkkkkkkk',
			OP: 'Sally Henry',
			summary: 'hello I am a girl and we love your site!',
			ID: 'DADADADAIOPDA',
			postTime: post_time(),
			randomColor: randomRGBcolor(),
			img: "http://www.k9healthcentre.com/img/dog_running.jpg"
		},
		{
			number: 8,
			title: 'okkkkkkkkkk',
			OP: 'Sally Henry',
			summary: 'hello I am a girl and we love your site!',
			ID: 'DADADADALKDA',
			postTime: post_time(),
			randomColor: randomRGBcolor(),
			img: "http://www.k9healthcentre.com/img/dog_running.jpg"
		},
		{
			number: 8,
			title: 'okkkkkkkkkk',
			OP: 'Sally Henry',
			summary: 'hello I am a girl and we love your site!',
			ID: 'DADADAQDALKDADP',
			postTime: post_time(),
			randomColor: randomRGBcolor(),
			img: "http://www.k9healthcentre.com/img/dog_running.jpg"
		}
	]

	return testData
})