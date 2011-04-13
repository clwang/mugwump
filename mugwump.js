var input = function () {
    var value;
    value = prompt("Input a value: ");
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

function calculate_difference(mug,x,y){
  var diff_x = mug.pos_x - x;
  var diff_y = mug.pos_y - y;
  var difference = Math.sqrt((diff_x * diff_x) + (diff_y * diff_y));
  return parseInt(difference);
};

function find_mugwump(mugs,found,x,y){
  var diff = [0,0,0,0];
  for(var i=0; i < 4; i++){
    if(found[i] === false){
      if(mugs[i].pos_x == x){
        if(mugs[i].pos_y == y){
          found[i] = true;
        }
        else{
          diff[i] = calculate_difference(mugs[i],x,y);
        }
      }
      else{
        diff[i] = calculate_difference(mugs[i],x,y);
      }
    }
  }
  return { found_result:found, diff_result:diff };
};

var game = function(mugs){
  var found = [false,false,false,false];
  var count = 0;
  while (count < 10){
    count += 1;
    var x = input();
    var y = input();
    var mugs_found = 0;
    var results = find_mugwump(mugs,found,x,y);
    
    // Print the results
    var results_msg = "";
    for(var i=0; i < 4; i++){
      if(results.found_result[i] == true){
        mugs_found += 1;
        results_msg += "YOU HAVE FOUND MUGWUMP " + (i+1) + "\n";
      }
      else{
        results_msg += "You are " + results.diff_result[i] + " units from mugwamp " + (i+1) + "\n";
      }
    }
    alert(results_msg);
    
    // Winner conditions
    if(mugs_found == 4){
      alert("You found all the mugwumps");
      alert("You got them all in " + count + " turns!");
      break;
    }
    
    // Loser conditions
    if(count == 10){
      var fail_msg = "SORRY, THAT'S 10 TRIES.  HERE IS WHERE THEY'RE HIDING:\n\n";
      for(var i=0; i < 4; i++){
        fail_msg += "MUGWUMP " + (i+1) + " is at (" + mugs.pos_x + "," + mugs.pos_y + ")!"; 
      }
    }
  }
  alert("THAT WAS FUN! LET'S PLAY AGAIN.......\nFOUR MORE MUGWUMPS ARE NOW IN HIDING.");
  main();
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
  game(mugs);
};

window.onload = main;