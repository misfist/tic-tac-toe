// Board object

var board = {
	1: null,
	2: null,
	3: null,
	4: null,
	5: null,
	6: null,
	7: null,
	8: null,
	9: null
};

var player, computer;



// Get Available Moves
// Input: object of key => value pairs corresponding to spot on board
// Output: array of numbers corresponding to open spots on board
var availableMoves = function( boardObj ) {

	var moves = [];

	var length = Object.keys( boardObj ).length;

	for( var i = 1; i <= length; i++ ) {

		if( boardObj[i] == null ) {

			moves.push( i );

		}

	}

	return moves;

}



// Winning Combinations
// Input: object of key => value pairs corresponding to spot on board
// Output: true if conditions for winning are met

var winner = function( board, player ) {

	return ( board['1'] == player && board['2'] == player && board['3'] == player ) ||
		( board['4'] == player && board['5'] == player && board['6'] == player ) ||
		( board['7'] == player && board['8'] == player && board['9'] == player ) ||
		( board['1'] == player && board['4'] == player && board['7'] == player ) ||
		( board['2'] == player && board['5'] == player && board['8'] == player ) ||
		( board['3'] == player && board['6'] == player && board['9'] == player ) ||
		( board['1'] == player && board['5'] == player && board['9'] == player ) ||
		( board['3'] == player && board['5'] == player && board['7'] == player ) 

}


// Winning Move
// Input: board object and player markert
// Output: winning move, if possible
var winningMove = function( board, player ) {

	var moves = availableMoves( board );

	for( var i = 0; i < moves.length; i++ ) {

		// Had trouble getting a temp duplicate of the board that didn't reference (and change) the board
		// This jQuery method seems to work and is recommended
		// http://www.mikitamanko.com/blog/2013/05/12/how-to-clone-an-object-in-javascript/

		var tempBoard = $.extend(true, {}, board);

		// Assign player mark to the spot in the temp board

		tempBoard[moves[i]] = player;

		// Check if it would be a winning board if that spot is played

		if( winner( tempBoard, player ) ) {

			//console.log( 'winning move: ', moves[i] );

			return moves[i];

		}
		
	}

}


// Player Turn
// Input: object of key => value pairs corresponding to spot on board and context (usually $(this))
// Output: side effect - player turn deactivates button and adds mark to spot in board object

var playerTurn = function( board, player, context ) {

	context.addClass( 'selected ' + player.toLowerCase() + '-mark' ).prop( 'disabled', true );
	context.html( player );

	var move = context.attr( 'id' );
	move = parseInt( move );

	board[move] = player;

}


// Computer Turn
// Input: board object
// Output: winning spot number or random spot number

var computerTurn =  function( board ) {

	var player = 'O';
	var moves = availableMoves( board );

	// If winning move exists
	if( winningMove( board, player ) ) {

		var move = winningMove( board, player );

	} else { // Else pick a random available spot

		var randomNum = Math.ceil( Math.random() * moves.length );
		var move = moves[randomNum - 1];

		//console.log( 'moves[randomNum - 1] ', moves[randomNum - 1] ); 

	}

	// Assign mark to spot in board object

	board[move] = player;

	// Disable button
	$( '#' + move ).addClass( 'selected '+ player.toLowerCase() + '-mark' ).prop( 'disabled', true );
	$( '#' + move ).html( player );

}


// Play Again Button when game is over

var playAgain = function( id, text ) {

	$( id ).after( '<button id="reload" class="btn btn-success">' );
	$( '#reload' ).html( text );

	$( '#reload' ).on( 'click', function() {

		window.location.reload();

		// Re-enable buttons to address Firefox issue
		$( id ).find( 'button' ).prop( 'disabled', false );

	} );

}



// Action when player click spot on board

$(document).ready(function() {

	// Make sure buttons are enabled on start or page refresh
	$( '#tic-tac-toe' ).find( 'button' ).prop( 'disabled', false );

	$( '#tic-tac-toe' ).on( 'click', 'button', function() {

		// PLAYER TURN
		playerTurn( board, 'X', $(this) );

		// If Player Wins
		if( winner( board, 'X' ) ) {

			alert( 'You Win!' );

			playAgain( '#tic-tac-toe', 'Play Again' );

			return;

		}


		// COMPUTER

		computerTurn( board );

		// If Computer Wins

		if( winner( board, 'O' ) ) {

			alert( 'You Lose!' );

			playAgain( '#tic-tac-toe', 'Play Again' );

			return;

		}


		// If There Are No Moves Available and No Winners, it's a Tie

		var moves = availableMoves( board );

		if( moves.length = 0 ) {

			alert( 'It\'s a Tie!' );

			playAgain( '#tic-tac-toe', 'Play Again' );

			return;

		}

	} );


});

