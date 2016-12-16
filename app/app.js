angular.module('myApp', ['firebase', 
  'catalog', 'thread', 'threadPreview', 'newPost', 'views', 'newReply', 'canvasBot', 'canvasTest', 'browse', 'ngAudio', 'musicPlayer', 'musicController', 'albumPreview', 'albumDetail', 'myLibrary', 'createAlbum', 'ngFileUpload', 'login', 'signUp', 'createArtist', 'artists', 'artist'])
























































































































// can activate to view chatbox demo
/*.directive('chatBox', function() {
  return {
      restrict: 'E',
      templateUrl: 'chat.html',
      scope: true,
      controllerAs: 'vm',
      controller: function($firebaseArray){
          var vm = this;
          var ref = firebase.database().ref('messages');
          vm.messages = $firebaseArray(ref);

          vm.sendMessage = function(send){
          		console.log("is it working?!!!")
              // do some validation
              if ( !send.message ) {
              	console.log("nothing happened"); 
              	return false;
              }
              else {
              // save the message
	              vm.messages.$add({
	                  message: send.message.trim(),
	                  userName: send.userName,
	                  datetime: Date.now()
	              });
	              send.message = '';
	            }
          };
      }
  };
});*/


//can activate to view the JSON object
/*.controller('myController', function($firebaseObject){
		console.log('hello');

    var fm = this;
    var ref = firebase.database().ref();
    fm.data = $firebaseObject(ref);
})*/