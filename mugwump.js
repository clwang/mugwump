



var input = function () {
    var value;
    do {
        value = prompt("Input a value: ");
    } while (value === null || value === "");
    return value;
};

function Mugwamp(){
  this.pos_x = Math.floor(Math.random()*10)
  this.pos_y = Math.floor(Math.random()*10)
};

var prepare = function(){
  var mugs = new Array();
  for(var i = 0; i < 4; i++){
    mugs[i] = new Mugwamp();
  }
  return mugs;
};

var main = function(){
  var intro = "\t\t\tMUGWUMP\n" + "CREATIVE COMPUTING  MORRISTOWN, NEW JERSEY\n\n" + 
              "THE OBJECT OF THIS GAME IS TO FIND \n" +
              "FOUR MUGWUMPS HIDDEN ON A 10 BY 10 GRID.\n" +  
              "HOMEBASE IS POSITION 0,0.\n" +
              "ANY GUESS YOU MAKE MUST BE TWO NUMBERS\n" +
              " WITH EACH NUMBER BETWEEN 0 AND 9, INCLUSIVE.\n" + 
              "FIRST NUMBER IS DISTANCE TO RIGHT OF HOMEBASE\n" +
              "AND SECOND NUMBER IS DISTANCE ABOVE HOMEBASE.";
  alert(intro);
  var tries_msg = "YOU GET 10 TRIES.  AFTER EACH TRY, I WILL TELL\n" +
                  "YOU HOW FAR YOU ARE FROM EACH MUGWUMP."
  alert(tries_msg);
  var mugs = prepare();
  
};

window.onload = main;