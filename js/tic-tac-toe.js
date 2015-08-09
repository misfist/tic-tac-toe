jQuery(function(){

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

	console.log( availableMoves( board ) );

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

	console.log( 'winner: ', winner( board, 'X' ) );


	// Winning Move
	// Input
	// Output
	var winningMove = function( board, moves, player ) {

		var movesLeft = availableMoves( board );

		for( var i = 1; i <= movesLeft.length; i++ ) {

			var tempBoard = Object.create( board );

			tempBoard[i] = player;

			if( winner( tempBoard, player ) ) {

				console.log( 'tempBoard[i] ', tempBoard[i] );

				return tempBoard[i];

			}
			
		}

	}


	// Player Turn
	// Input: object of key => value pairs corresponding to spot on board and context (usually $(this))

	var playerTurn = function( board, player, context) {

		context.addClass( 'selected ' + player.toLowerCase() + '-mark' ).prop( 'disabled', true );
		context.html( player );

		var move = context.attr( 'id' );
		move = parseInt( move );

		board[move] = player;

	}

	// Computer Turn
	// Input:
	// Output:

	var computerTurn =  function( board ) {

		var player = 'O';
		var moves = availableMoves( board );

		console.log( 'moves ', moves );

		if( winningMove( board, moves, player ) ) {

			var move = winningMove( board, moves, player );

			console.log( 'winningMove( board, moves, player ) ', winningMove( board, moves, player ) ); 

		} else {

			var move = Math.ceil( Math.random() * moves.length );

		}

		board[move] = player;

		$( '#' + move ).addClass( 'selected '+ player.toLowerCase() + '-mark' ).prop( 'disabled', true );
		$( '#' + move ).html( player );



	}


	// On Click
	// Input: User click

	$( '#tic-tac-toe' ).on( 'click', 'button', function() {

		// If There Are Moves Available

		// Player's Turn
		playerTurn( board, 'X', $(this) );

		// If Player Wins


		// Computer's Turn

		computerTurn( board );

		// If Computer Wins


		// If There Are No Moves Available and No Winners, it's a Tie

	} );
	



});