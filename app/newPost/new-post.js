angular.module('newPost', ['firebase'])

.directive('mxNewPost', ['auth', function(auth){
	return {
		restrict: 'E',
	  templateUrl: 'newPost/new-post.html',
	  scope: true,
	  transclude: true,
    controllerAs: 'vm',
	  controller: function($firebaseArray, $location){
      var vm = this;

	  	var ref = firebase.database().ref('threads');
      vm.threads = $firebaseArray(ref);

      vm.newThread = function(send){
    		console.log("is it working?!!!")
        // do some validation
        if ( !send.thread ) {
        	console.log("nothing happened"); 
        	return false;
        }
        else {
        // save the thread
          console.log('it might be')
          const _OPID = make_randID();

          //array of threads containing thread objects
          //thread object contains array of posts
          // threads[0] selects the first thread
          // threads[0].posts[0] is the OP and also URL
          //array of posts inside of each thread


          /*if (vm.sendImage==null){
              _sendImage='http://www.geeks123.com/wp-content/uploads/2014/09/punch-through-computer-screen-frustration.jpg'
            } else if (vm.sendImage==undefined){
              _sendImage='http://www.geeks123.com/wp-content/uploads/2014/09/punch-through-computer-screen-frustration.jpg'
            } else {
              _sendImage=vm.sendImage
            }*/

          const _datesort = new Date().getTime()
          const _datesortMain = new Date().getTime()
          var userName = ''

          if(auth.isLogged){
            userName = auth.username
          } else{
            userName = 'anonymous'
          }


          vm.threads.$add({
            OPID: _OPID,
            posts: [{
              ID: _OPID,
              canvasID: _OPID+"cID",
              userName: userName,
              datetime: post_time(),
              datesort: new Date().getTime(),
              datesortMain: new Date().getTime(),
              content: send.thread.trim(),
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
              image: vm.sendImage || '',
              cParam1: getRandomNumber(0,20),
              cParam2: getRandomNumber(0,20),
              cParam3: getRandomNumber(0,20),
              cParam4: getRandomNumber(0,20),
              cParam5: getRandomNumber(0,10),
              cRep1: getRandomNumber(5,30),
              cRep2: getRandomNumber(5,30),
              cParamAdd1: getRandomNumber(0,5),
              cParamAdd2: getRandomNumber(0,5),
              cBGC: rgb2hex(randomRGBcolor())
          }]});
          send.thread = '';
          $location.path('/catalog/' + _OPID);
        }
      };
	  	
	  }
  }
}])


// scope.threads.OPID
// scope.threads.posts
// #of post in database = array[#]