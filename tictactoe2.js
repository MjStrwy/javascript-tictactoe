

//array of possible spaces
var availableSpaces = ["1-1","1-2", "1-3","2-1","2-2", "2-3","3-1","3-2","3-3"];
var playerSymbol = "";
var computerSymbol = "";
var win = false;
var playerTurn = true;

$(document).ready(function(){
	//drawBoard();
	drawGreeting();
	$("#btn_teamX").click(function(){
		playerSymbol = "X";
		computerSymbol= "O";
		$("#team_display").html("Team: " + playerSymbol);
	})
	
	$("#btn_teamO").click(function(){
		playerSymbol = "O";
		computerSymbol = "X";
		$("#team_display").html("Team: " + playerSymbol);
	});
	
	$('.gameSquare').click(function(){
		var symbol = "";
		if(playerTurn){
			symbol = playerSymbol;
		} else {
			symbol = computerSymbol;
		}
		if(!$(this).hasClass('taken')){
			$(this).html(symbol).addClass("taken");
			var index = availableSpaces.indexOf($(this).attr('id'));
			availableSpaces.splice(index,1);
			console.log("Available Spaces: " + availableSpaces);
			check_for_win($(this));
		} else {
			alert("Space is already taken");
		}
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


//show a message
function drawGreeting(){
	$("#gameFrame").html(
		'<div>How do you want to play?</div>'+
		'<div id="onePlayer" class="btn btn-default">One Player</div><div id="twoPlayer" class="btn btn-default">Two Player</div>'
		);
	// $('.btn').click(drawTeamChoice());
	// $('.btn').click(function(){alert("helloWorld")});
	$('.btn').click(function(){drawTeamChoice()});
}

function drawTeamChoice(){
	$("#gameFrame").html(
		'<div>Would you like to be X or O?</div>' +
		'<div class="btn btn-default">X</div>' +
		'<div class="btn btn-default">O</div>'+
		'<div id="back" class="btn btn-default">Back</div>');
	$(".btn").click(function(){drawBoard()});
	$("#back").click(function(){drawGreeting()});
}

//create the board
function drawBoard(){
	$('#gameFrame').html(
		'<div><div class="row"><div id="1-1" class="col--s-6 col-md-4 gameSquare">-</div><div id="1-2" class="col--s-6 col-md-4 gameSquare vertical">-</div><div id="1-3" class="col--s-6 col-md-4 gameSquare">-</div></div><div class="row"><div id="2-1" class="col--s-6 col-md-4 gameSquare horizontal">-</div><div id="2-2" class="col--s-6 col-md-4 gameSquare horizontal vertical">-</div><div id="2-3" class="col--s-6 col-md-4 gameSquare horizontal">-</div></div><div class="row"><div id="3-1" class="col--s-6 col-md-4 gameSquare">-</div><div id="3-2" class="col--s-6 col-md-4 gameSquare vertical">-</div><div id="3-3" class="col--s-6 col-md-4 gameSquare">-</div></div></div>'
	);
}


function clickSquare(symbol){
	if(!$(this).hasClass('taken')){
		$(this).html(symbol).addClass("taken");
		check_for_win($(this));
	} else {
		alert("Space is already taken");
	}
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
    if(symbol == playerSymbol){
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
