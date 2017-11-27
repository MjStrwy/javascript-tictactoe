
//------------Globals---------------------------------------//
//array of possible spaces
var availableSpaces = ["1-1","1-2", "1-3","2-1","2-2", "2-3","3-1","3-2","3-3"];
var playMode = 1;
var playerSymbol = "";
var computerSymbol = "";
var win = false;
var playerTurn = true;
var gamesWon = 0;
var p1GamesWon = 0;
var p2GamesWon = 0;
var gamesLost = 0;
var gamesTied = 0;

//----------click handlers--------------------------//
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
	
	//use 'on' the parent element so that dynamically created gameSquares have event handlers added
	$('#gameFrame').on('click', ".gameSquare", function(){
		console.log("Square clicked");
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
			// if player turn, call computer turn and computer click
			if(playerTurn && playMode == 1){
				playerTurn = false;
				//setTimeout($('#btn_compPlay').click(), 1000);
				$('#btn_compPlay').click();
			} else if (playerTurn && playMode == 2){
				changeTurn();
				$('#turn_display').text("Player 2"); 
			} 
				else {
				playerTurn = true;
				$('#turn_display').text("Player 1");
			}
		} /*else {
			alert("Space is already taken");
		}*/
	});
	
	$('#btn_compTurn').click(function(){
		changeTurn();
	});

	$('#btn_compPlay').click(function(){
		// TODO break out into own function "compTurn"
		// add some checking to determine best move to make (e.g. complete line if possible) rather than simple random selection
		var index = Math.floor(Math.random() * availableSpaces.length);
		console.log("Comp takes " + availableSpaces[index]);
		console.log("Index is: " + index);
		$('#' + availableSpaces[index]).click();
	});

	$('#btn_reset').click(function(){
		reset();
	});


//----------------Functions--------------------//
function drawGreeting(){
	/*$("#gameFrame").html(
		'<div id="introOptions">'+
			'<h1>How do you want to play?</h1>'+
			'<div id="onePlayer" class="btn btn-default btn_players">One Player</div> +
			'<div id="twoPlayer" class="btn btn-default btn_players">Two Player</div>' + 
		'</div>'
		);*/
	$('#playOptionsModal').modal('show');
	$('.btn_players').click(function(){
		playMode = ($(this).text() === "One Player" ? 1 : 2);
		$("#playModeLbl").text((playMode === 1 ? "One Player" : "Two Player"));
		drawTeamChoice();
	});
}

function drawTeamChoice(){
	/*$("#gameFrame").html(
		'<div id="introOptions">'+
			'<h1>Would you like to be X or O?</h1>' +
			'<div class="btn btn-default btn_team">X</div>' +
			'<div class="btn btn-default btn_team">O</div>'+
			'<div id="back" class="btn btn-default">Back</div>' +
		'</div>');*/
	$('#teamOptionsModal').modal('show');
	$(".btn_team").click(function(){
		playerSymbol = $(this).text();
		if(playerSymbol === "X"){
			computerSymbol = "O";
		} else {
			computerSymbol = "X";
		}
		$("#team_display").html("Team: " + playerSymbol);
		$("#turn_display").html("Turn: " + (playerTurn ? "Player" : "Computer"));
		drawBoard()
	});
	$("#back").click(function(){drawGreeting()});
}

//create the board
function drawBoard(){
	$('#gameFrame').html(
		'<div><div class="row"><div id="1-1" class="col-xs-4 gameSquare">-</div><div id="1-2" class="col-xs-4 gameSquare vertical">-</div><div id="1-3" class="col-xs-4 gameSquare">-</div></div><div class="row"><div id="2-1" class="col-xs-4 gameSquare horizontal">-</div><div id="2-2" class="col-xs-4 gameSquare horizontal vertical">-</div><div id="2-3" class="col-xs-4 gameSquare horizontal">-</div></div><div class="row"><div id="3-1" class="col-xs-4 gameSquare">-</div><div id="3-2" class="col-xs-4 gameSquare vertical">-</div><div id="3-3" class="col-xs-4 gameSquare">-</div></div></div>'
	);
}

//check for winning moves
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
		if(playMode == 2){
			$('#end_display').text("Player 1 wins!");
			p1GamesWon++;
		} else {
			$("#end_display").text("You've won!");
			gamesWon++;
		}
	} else {
		if(playMode == 2){
			$('#end_display').text("Player 2 wins!");
			p2GamesWon++;
		} else {
			$("#end_display").text("Computer wins!");
			gamesLost++;
			changeTurn();
		}
	}
	$('.gameSquare').addClass('taken');
	reset();
  }

  if(!win && availableSpaces.length == 0){
  	gamesTied++;
  	alert("Game is a draw!");
  	reset();
  }
}

//helper functions for check win
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

function reset(){
	// update the games won/lost/tied labels
	if(playMode == 1){
		$('#gamesWonLbl').text('Games Won: ' + gamesWon);
		$('#gamesLostLbl').text('Games Lost: ' + gamesLost);
	} else if (playMode ==2){
		$('#p1GamesWonLbl').text('Player 1 Games Won: ' + p1GamesWon);
		$('#p2GamesWonLbl').text('Player 2 Games Won: ' + p2GamesWon);
	}
	$('#gamesTiedLbl').text('Games Tied: ' + gamesTied);

	availableSpaces = ["1-1","1-2", "1-3","2-1","2-2", "2-3","3-1","3-2","3-3"];
	playMode = 1;
	playerSymbol = "";
	computerSymbol = "";
	win = false;
	changeTurn(); // changes playerTurn to true

	// TODO modify drawBoard() so that player and comp symbols retained
	//drawBoard();
	drawGreeting();
}

function changeTurn(){
	if(playerTurn == false){
			playerTurn = true;
			$('#turn_display').html('Player'); 
		} else {
			playerTurn = false;
			$('#turn_display').html('Computer'); 
		} 
}

//----------main--------------------------------------//

drawGreeting();
