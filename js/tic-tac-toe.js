jQuery(function(){

	var board = [];
	var slots = [1, 2, 3, 4, 5, 6, 7, 8, 9];

	var player;
	var computer;

	var winner = function( array, player ) {
		if (
			( array[0] == player && array[1] == player && array[2] == player ) ||
			( array[3] == player && array[4] == player && array[5] == player ) ||
			( array[6] == player && array[7] == player && array[8] == player ) ||
			( array[0] == player && array[3] == player && array[6] == player ) ||
			( array[1] == player && array[4] == player && array[7] == player ) ||
			( array[2] == player && array[5] == player && array[8] == player ) ||
			( array[0] == player && array[4] == player && array[8] == player ) ||
			( array[2] == player && array[4] == player && array[6] == player ) 
		) {
			return true;
		}
	}


	var computerTurn = function( board, slots ) {

		// Get number of remaining slots
		slotsLength = slots.length;

		// Pick a random number from remaining slots
		randomNum = Math.floor( Math.random() * slotsLength );

		// Capture slot (it's an integer)
		computer = slots[randomNum];

		// Add a class and disable button
		$( '#' + computer ).addClass('selected o-mark').prop( 'disabled', true );
		$( '#' + computer ).html( 'O' );

		// Record turn
		board[computer - 1] = 'O';

		slots.splice( randomNum, 1 );

	}


	var playerTurn = function( board, slots, context ) {

		// Add a class and disable button
		context.addClass( 'selected x-mark' ).prop( 'disabled', true );
		context.html( 'X' );

		// Capture slot
		player = context.attr( 'id' );

		// Convert to slot string to integer
		player = parseInt( player );

		// Record turn
		board[ player - 1 ] = 'X';

		// Remove from available slots
		slots.splice( slots.indexOf(player), 1 );

	}


	var playAgain = function( id, text ) {

		$( id ).after( '<button id="reload" class="btn btn-success">' );
		$( '#reload' ).html( text );

		$( '#reload' ).on( 'click', function() {

			window.location.reload();

			// Re-enable buttons to address Firefox issue
			$( id ).find( 'button' ).prop( 'disabled', false );

		} );

	}


	$( '#tic-tac-toe' ).on( 'click', 'button', function( event ) {

		if( !winner( board, 'X' ) && !winner( board, 'O' ) ) {

			// Player Turn

			playerTurn( board, slots, $( this ) );

			// Outcome: if winning combo, player wins
			if( winner( board, 'X' ) ) {

				alert( 'You Win!' );

				playAgain( '#tic-tac-toe', 'Play Again' );

				return;

			}

			// Computer Turn

			computerTurn( board, slots );

			// Outcome: if winning combo, computer wins
			if( winner( board, 'O' ) ) {

				alert( 'Computer Wins!' );

				playAgain( '#tic-tac-toe', 'Play Again' );

				return;

			}

			// Outcome, if no winning combo and no more slots, it's a tie
			if( slots.length == 0 ) {

				alert( 'It\'s a Tie.' );

				playAgain( '#tic-tac-toe', 'Play Again' );

				return;

			}

		}

	} );

});