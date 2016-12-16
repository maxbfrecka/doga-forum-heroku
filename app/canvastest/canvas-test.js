angular.module('canvasTest',[])

.directive('mxCanvasTest', ['testData', 'canvasDataTest', '$timeout', '$interval', 'threadData', function(testData, canvasDataTest, $timeout, $interval, threadData){
	return {
		restrict: 'E',
	  templateUrl: 'canvastest/canvas-test.html',
	  scope: {},
	  transclude: true,
	  controllerAs: "ct",
	  link: function(scope,element,attrs){
	  	scope.canvasDataTest = canvasDataTest
	  	scope.threadData = threadData.threads

	 
	  	scope.canvasid = attrs.canvasid
	  	//in canvas backgroundcolor
	  	scope.cbgc = attrs.cbgc

// TEST FOR CANVAS TEST PAGE

			var limit1 = 20
			var limit2 = 10

	  	scope.param1=getRandomNumber(0,limit1)
	  	scope.param2=getRandomNumber(0,limit1)
	  	scope.param3=getRandomNumber(0,limit1)
	  	scope.param4=getRandomNumber(0,limit1)
	  	scope.param5=getRandomNumber(0,limit2)
	  	console.log('param1: ' + scope.param1)
	  	console.log('param2: ' + scope.param2)
	  	console.log('param3: ' + scope.param3)
	  	console.log('param4: ' + scope.param4)
	  	console.log('param5: ' + scope.param5)

	  	scope.cRepOne=getRandomNumber(5,30)
	  	scope.cRepTwo=getRandomNumber(5,30)
	  	console.log(scope.cRepOne)
	  	console.log(scope.cRepTwo)

	  	scope.paramAdd1=getRandomNumber(0,5)
	  	scope.paramAdd2=getRandomNumber(0,5)
	  	console.log(scope.paramAdd1)
	  	console.log(scope.paramAdd2)

	  	$timeout(function(){
				scope.canvasDataTest.generateCanvasB(scope.canvasid, scope.param1, scope.param2, scope.param3, scope.param4, scope.param5, scope.cRepOne, scope.cRepTwo, scope.paramAdd1, scope.paramAdd2)
				}, 100)




//TEST FOR MAIN PAGE
			//threads:
			/*scope.threadData = threadData.threads

	  	scope.param1=parseFloat(attrs.paramOne)
	  	scope.param2=parseFloat(attrs.paramTwo)
	  	scope.param3=parseFloat(attrs.paramThree)
	  	scope.param4=parseFloat(attrs.paramFour)
	  	scope.param5=parseFloat(attrs.paramFive)
	  	console.log('param1: ' + scope.param1)
	  	console.log('param2: ' + scope.param2)
	  	console.log('param3: ' + scope.param3)
	  	console.log('param4: ' + scope.param4)
	  	console.log('param5: ' + scope.param5)

	  	scope.cRepOne=parseFloat(attrs.crepone)
	  	scope.cRepTwo=parseFloat(attrs.creptwo)
	  	console.log(scope.cRepOne)
	  	console.log(scope.cRepTwo)

	  	scope.paramAdd1= parseFloat(attrs.cparamaddone)
	  	scope.paramAdd2= parseFloat(attrs.cparamaddtwo)
	  	console.log(scope.paramAdd1)
	  	console.log(scope.paramAdd2)
	  	scope.threadData.$loaded(function(){
		  	$timeout(function(){
					scope.canvasDataTest.generateCanvasB(scope.canvasid, scope.param1, scope.param2, scope.param3, scope.param4, scope.param5, scope.cRepOne, scope.cRepTwo, scope.paramAdd1, scope.paramAdd2)
					}, 100)})*/



	  	// - > it has access to the array, it has access to the data
	  	// the problem has to do with accessing the variables.
	  	// I think that the scope is changing 




//test using random in new function
	  	/*var limit1 = 20
			var limit2 = 10


	  	scope.param1=getRandomNumber(0,limit1)
	  	scope.param2=getRandomNumber(0,limit1)
	  	scope.param3=getRandomNumber(0,limit1)
	  	scope.param4=getRandomNumber(0,limit1)
	  	scope.param5=getRandomNumber(0,limit2)

	  	scope.cRepOne=getRandomNumber(5,30)
	  	scope.cRepTwo=getRandomNumber(5,30)

	  	scope.paramAdd1=getRandomNumber(0,5)
	  	scope.paramAdd2=getRandomNumber(0,5)*/


	  	//everything exactly the same other than data that is used
	  	//data received from firebase
	  	console.log('wtf')
	  	//this is some goofy shit... it's something to do with firebase I think
	  	//very confused


	  	/*scope.threadData.$loaded(function(){
		  	$timeout(function(){
					scope.canvasDataTest.generateCanvasB(scope.canvasid, scope.param1, scope.param2, scope.param3, scope.param4, scope.param5, scope.cRepOne, scope.cRepTwo, scope.paramAdd1, scope.paramAdd2)
					}, 100)})*/



//not due to the actual template... it's something else...
//this is happening due to the API call.



	  },
	  controller: function($scope, canvasDataTest, $attrs) {
	  	var ct = this
	  }
	}
}])




.factory('canvasDataTest', function(){
	var canvasDataTest = {}

	canvasDataTest.imageID = null;




	canvasDataTest.generateCanvasA = function(id, param1, param2, param3, param4, param5, rep1, rep2, add1, add2){
			console.log('huh?')
	  	var canvas = document.getElementById(id);
			var ctx = canvas.getContext("2d");
			ctx.beginPath(); 
			ctx.lineWidth=".5";


			var draw1 = function(){
				ctx.moveTo(param3,param2);
				ctx.lineTo(param1,param3+param1);
				ctx.moveTo(param1,param4);
				ctx.lineTo(param3+param3,param2);
				ctx.moveTo(param2,param4);
				ctx.lineTo(param3,param1);
				ctx.lineTo(param4+param1,param2);
				ctx.strokeStyle=randomRGBcolor();
				ctx.fillStyle = randomRGBcolor();
				}

			var draw2 = function(){
				for (var i=0; i<rep1; i++){
					draw1()
					param1=param1+add1
					param2=param2+add1+1
					param3=param3+add1+add1*.5
					param4=param4+add1+add1
				}
			}

			var draw3 = function(){
				for (var i=0; i<rep2; i++){
					draw2()
					param1=param1+add2
					param2=param2+add2+1
					param3=param3+add2+add2*.5
					param4=param4+add2+add2
					ctx.stroke();
					ctx.fill()
				}
			}




			draw3()


			
	}





	canvasDataTest.generateCanvasB = function(id, param1, param2, param3, param4, param5, rep1, rep2, add1, add2){
		console.log('huh?')

		var draw0 = function(){
	  	var canvas = document.getElementById(id);
			var ctx = canvas.getContext("2d");
			

			var draw1a = function(){
				ctx.beginPath(); 
				ctx.lineWidth=getRandomNumber(.5,3);
				ctx.moveTo(param3,param2);
				ctx.lineTo(param1,param3+param1);
				ctx.moveTo(param1,param4);
				ctx.lineTo(param3+param3,param2);
				ctx.arcTo(param1,param2,param3,param4,param5)
				ctx.moveTo(param2,param4);
				ctx.lineTo(param3,param1);
				ctx.lineTo(param4+param1,param2);
				ctx.strokeStyle=randomRGBcolor();
				ctx.fillStyle = randomRGBcolor();
				ctx.stroke()
				ctx.fill()
				ctx.closePath()
				ctx.scale(.8,.8)
			}
			draw1a()
			

			var draw1b = function(){
				ctx.beginPath(); 
				ctx.lineWidth=getRandomNumber(.5,3);
				ctx.moveTo(param1,param3);
				ctx.lineTo(param2,param4+param5);
				ctx.moveTo(param2,param5);
				ctx.lineTo(param5+param5,param1);
				ctx.arcTo(param5,param4,param1,param3,param5)
				ctx.moveTo(param2,param4);
				ctx.lineTo(param3,param1);
				ctx.lineTo(param5+param1,param3);
				ctx.strokeStyle=randomRGBcolor();
				ctx.fillStyle = randomRGBcolor();
				ctx.stroke()
				ctx.fill()
				ctx.closePath()
				ctx.scale(1.245,1.245)
			}
			draw1b()
		}

		var draw2 = function(){

			for (var i=0; i<rep1; i++){
				draw0()
				param1=param1+add1
				param2=param2+add1+1
				param3=param3+add1+add1*.5
				param4=param4+add1+add1
				console.log('draw 2 is functioning')
			}
		}

		var draw3 = function(){
				for (var i=0; i<rep2; i++){
					draw2()
					param1=param1+add2
					param2=param2+add2+1
					param3=param3+add2+add2*.5
					param4=param4+add2+add2
				}
			}




		draw3()
	}













		canvasDataTest.generateImagesA = function(id, param1, param2){
	  	var canvas = document.getElementById(id);
			var ctx = canvas.getContext("2d");
			ctx.beginPath(); 
			ctx.lineWidth="1.9";
			ctx.strokeStyle=randomRGBcolor();
			ctx.fillStyle = randomRGBcolor();
			ctx.fill();
			ctx.moveTo(0,40);
			ctx.lineTo(50,30+20);
			ctx.moveTo(param1,30);
			ctx.lineTo(150+20,param2);
			ctx.moveTo(param2,100);
			ctx.lineTo(230,param1);
			ctx.lineTo(60+param1,param2);
			ctx.stroke();
		}
















	canvasDataTest.generateImagesA = function(id, param1, param2){
	  	var canvas = document.getElementById(id);
			var ctx = canvas.getContext("2d");
			ctx.beginPath(); 
			ctx.lineWidth="1.9";
			ctx.strokeStyle=randomRGBcolor();
			ctx.fillStyle = randomRGBcolor();
			ctx.fill();
			ctx.moveTo(0,40);
			ctx.lineTo(50,30+20);
			ctx.moveTo(param1,30);
			ctx.lineTo(150+20,param2);
			ctx.moveTo(param2,100);
			ctx.lineTo(230,param1);
			ctx.lineTo(60+param1,param2);
			ctx.stroke();
	}


	
	return canvasDataTest

})