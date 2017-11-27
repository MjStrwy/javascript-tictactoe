var team = "";
var comp = "";
var win = false;
var availableSpaces = ['1-1', '1-2','1-3','2-1','2-2','2-3','3-1','3-2','3-3'];
var playerTurn = true;

$(document).ready(function(){

  $('#gameFrame').html(
    '<div><div class="row"><div id="1-1" class="col-xs-6 col-md-4 gameSquare">X</div><div id="1-2" class="col-xs-6 col-md-4 gameSquare">X</div><div id="1-3" class="col-xs-6 col-md-4 gameSquare">X</div></div><div class="row"><div id="2-1" class="col-xs-6 col-md-4 gameSquare">X</div><div id="2-2" class="col-xs-6 col-md-4 gameSquare">X</div><div id="2-3" class="col-xs-6 col-md-4 gameSquare">X</div></div><div class="row"><div id="3-1" class="col-xs-6 col-md-4 gameSquare">X</div><div id="3-2" class="col-xs-6 col-md-4 gameSquare">X</div><div id="3-3" class="col-xs-6 col-md-4 gameSquare">X</div></div></div>'
  );
  
  init();
  
  $("#btn_teamX").click(function(){
    team = "X";
    comp = "O";
    $("#team_display").html("Team: " + team);
  })
  
  $("#btn_teamO").click(function(){
    team = "O";
    comp = "X";
    $("#team_display").html("Team: " + team);
  });
  
  $('.gameSquare').click(function(){
	clickSquare();
  });
  
  $('#btn_compTurn').click(function(){
	 if(playerTurn == false){
		 playerTurn = true;
		 $('#turn_display').html('Player'); 
	 } else {
		 playerTurn = false;
		 $('#turn_display').html('Computer'); 
	 } 
  });
});


function init(){
	$('.gameSquare').html('-');
}


function clickSquare(){
	$(this).addClass("taken");
    if(playerTurn){
      $(this).html(team);
    } else {
      $(this).html(comp);
    }
    /*var index = availableSpaces.indexOf($(this).attr('id'));
    availableSpaces.splice(index,1);
    console.log("Available Spaces: " + availableSpaces);*/
    //alert($(this).attr('id'));
	//check_for_win($(this));
}


function init(){
  $('.gameSquare').html("-");
}


function check_for_win(square){
  var pos = square.attr('id').split('-');
  var symbol = square.html();
  
  if(check_horizontal_win(pos, symbol)){
    win = true;
  } else if (check_vertical_win(pos, symbol)){
    win = true;
  }  else if(check_diagonal_win(pos, symbol)){
    win = true; 
  } else {
    win = false;
  }
  
  
  if(win){
    if(symbol ==team){
	alert("You've won!");
	} else {
		alert("Computer wins!");
	}
  }
}


function check_horizontal_win(pos, symbol){
  var posX = parseInt(pos[1]);
  var posY = parseInt(pos[0]);
  if(symbol == $('#'+posY+'-1').html() && symbol == $('#'+posY+'-2').html() && symbol == $('#'+posY+'-3').html()){
    return true;
  } else {
    return false;
  }
}


function check_vertical_win(pos, symbol){
  var posX = parseInt(pos[1]);
  var posY = parseInt(pos[0]);
  if(symbol == $('#1-'+posX).html() && symbol == $('#2-'+posX).html() && symbol == $('#3-'+posX).html()){
    return true;
  } else {
    return false;
  }
}


function check_diagonal_win(pos, symbol){
   if(($('#1-1').html() == symbol && $('#2-2').html() == symbol && $('#3-3').html() == symbol)){
      return true;
      } else if(($('#1-3').html() == symbol && $('#2-2').html() == symbol && $('#3-1').html() == symbol)){
      return true;
      }else {
      return false;
      }
}


function playerTurn(){
  clickSquare();
  console.log("Player Turn");
  playerTurn = false;
}


function compTurn(){
  clickSquare();
  console.log("Computer turn");
  playerTurn = true;
}