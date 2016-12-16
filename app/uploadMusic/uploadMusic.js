angular.module('uploadMusic',['ngFileUpload'])
.directive('mxUploadMusic', ['ngAudio', 'nowPlayingList', 'browseTestData', 'libraryData', '$http', 'Upload', function(ngAudio, nowPlayingList, browseTestData, libraryData, $http, Upload){
	return {
		restrict: 'E',
	  templateUrl: 'uploadMusic/uploadMusic.html',
	  scope: {},
	  transclude: true,
	  controllerAs: "uc",
	  
	  link: function(scope, element, attrs){
	  	
/*	  	scope.apiUpload = function(){
	  		$http.post('/api/uploadMusic', myFile)
	  		.then(function()
	  			{console.log('success!')},
	  		function(){ 
	  			console.log('failure')})
	  	}*/

	  	scope.username = 'TEST USERNAME'
	  	scope.upload = function (file) {
        Upload.upload({
            url: '/../api/uploadMusic',
            data: {file: file, 'username': scope.username, wigwam: 'heck yeah', 'yiggie':'woaaaaahhhhh'},
            file: file
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };








	  },

	  controller: function(){
	  }
	}
}])




