/*jslint white: true, onevar: true, undef: true, nomen: true, regexp: true, plusplus: true, bitwise: true, newcap: true, maxerr: 50, indent: 4 */
var counter = 0,
    found = [false, false, false, false],
    mugs_found = 0,
    results_msg = "",
    mugs = [];

function Mugwamp() {
    this.pos_x = Math.floor(Math.random() * 10);
    this.pos_y = Math.floor(Math.random() * 10);
}

var prepare = function () {
    var mugs = [],
        i = 0;
    for (; i < 4; i = i + 1) {
        mugs[i] = new Mugwamp();
    }
    return mugs;
};

function calculate_difference(mug, x, y) {
    var diff_x = mug.pos_x - x,
        diff_y = mug.pos_y - y,
        difference = Math.sqrt((diff_x * diff_x) + (diff_y * diff_y));
    return parseInt(difference, 10);
}

function clear_board(opts) {
  if (typeof opts == "undefined") {
      opts = false;
    }
  if (opts) {
    var elems = $('.found');
    elems.each(function(index,element){
      $(element).removeClass('found');
    });
  } 
  var el = $('.miss');
  el.each(function(index,element){
    $(element).removeClass('miss');
  });
}

function find_mugwump(x, y) {
    clear_board();
    var x = x.val();
    var y = y.val();
    var found_flag = false;
    var diff = [0, 0, 0, 0],
        i = 0;
    for (; i < 4; i += 1) {
        if (found[i] === false) {
            if (mugs[i].pos_x + "" === x) {
                if (mugs[i].pos_y + "" === y) {
                    found[i] = true;
                    found_flag = true;
                } else {
                    diff[i] = calculate_difference(mugs[i], x, y);
                }
            } else {
                diff[i] = calculate_difference(mugs[i], x, y);
            }
        }
    }
    draw(x,y,found_flag);
    return {
        found_result: found,
        diff_result: diff
    };
}

function draw(x, y, found) {
  if (found) {
    $($('#row' + y + " td")[x]).addClass('found');
  } else {
    $($('#row' + y + " td")[x]).addClass('miss');
  }
}

function input() {
  var x = $('#xval');
  var y = $('#yval');
  if (counter === 10) {
    alert('Game Over! Click start to play a new game');
  } else {
    results = find_mugwump(x,y);
    display_results(results);
    counter += 1;
    check_winner();
  }
  
}

function check_winner() {
  // Winner conditions
  if (mugs_found === 4) {
      alert("You found all the mugwumps");
      results_msg = "You got them all in " + counter + " turns!</br>"  + "THAT WAS FUN! LET'S PLAY AGAIN.......<br />FOUR MORE MUGWUMPS ARE NOW IN HIDING."
      print_message(results_msg);
      $('#xval, #yval').attr('disabled', false);
  }

  // Loser conditions
  if (counter === 10 && mugs_found !== 4) {
      results_msg = "SORRY, THAT'S 10 TRIES.  HERE IS WHERE THEY'RE HIDING:<br /><br />";
      for (; i < 4; i += 1) {
          results_msg += "MUGWUMP " + (i + 1) + " is at (" + mugs.pos_x + "," + mugs.pos_y + ")!<br />THAT WAS FUN! LET'S PLAY AGAIN.......<br />FOUR MORE MUGWUMPS ARE NOW IN HIDING.";
      }
      print_message(results_msg);
      $('#xval, #yval').attr('disabled', false);    
  }
}

function reset_game() {
      counter = 0;
      found = [false, false, false, false];
      mugs_found = 0;
      results_msg = "";
      mugs = [];
      clear_board(true);
      var new_msg = "Game has started.<br /> Please input two values between 0-9."
      print_message(new_msg);
      $('#xval, #yval').val('');
      $('#xval, #yval').attr('disabled', false);
}

function print_message(message) {
  $('#message_box').empty();
  $('#message_box').html(message);
}

function display_results() {
  var i = 0;
  for (; i < 4; i += 1) {
      if (results.found_result[i] === true) {
          mugs_found += 1;
          results_msg += "YOU HAVE FOUND MUGWUMP " + (i + 1) + "<br />";
      } else {
          results_msg += "You are " + results.diff_result[i] + " units from mugwamp " + (i + 1) + "<br />";
      }
  }
  print_message(results_msg);
}

var main = function () {
    reset_game();
    mugs = prepare();
};