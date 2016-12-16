//generate the randID//
//must ensure that it does not repeat by searching database
function make_randID()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for( var i=0; i < 8; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

//very basic random color generator
function randomRGBcolor(){
  function randCol(){
    var col =  Math.floor(Math.random() * 255);
    return col;
  }
  var first = randCol()
  var second = randCol()
  var third = randCol()
  var result = ''
  result = `rgb(${first},${second},${third})`
  return result
};



function rgb2hex(rgb){
  rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
  return (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}



function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}