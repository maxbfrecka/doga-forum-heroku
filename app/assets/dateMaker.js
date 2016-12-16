var post_time = function(){

    var date = new Date();

    //day
    var day = new Array();
    day[0] = "SUN";
    day[1] = "MON";
    day[2] = "TUE";
    day[3] = "WED";
    day[4] = "THU";
    day[5] = "FRI";
    day[6] = "SAT";
    var dayday = day[date.getDay()];

    //returns hour minutes seconds with zero added for 2 digits

    function addZero(i) {
      if (i < 10) {
       i = "0" + i;
      }
      return i;
    }      

    var hour = addZero(date.getHours());
    var minutes = addZero(date.getMinutes());
    var seconds = addZero(date.getSeconds());

    //month
    var month = new Array();
    month[0] = "01";
    month[1] = "02";
    month[2] = "03";
    month[3] = "04";
    month[4] = "05";
    month[5] = "06";
    month[6] = "07";
    month[7] = "08";
    month[8] = "09";
    month[9] = "10";
    month[10] = "11";
    month[11] = "12";
    var monthmonth = month[date.getMonth()];

    //day of month
    var dayofmonth = date.getDate();

    //2 digit year
    var year = date.getFullYear().toString().substr(2,2);

    var fulltime = dayday + ':' + monthmonth + dayofmonth + year + ':' + hour + minutes;

    return fulltime;
}










