jQuery(function(){

	var board = {
		1: null,
		2: 'X',
		3: null,
		4: 'X',
		5: null,
		6: null,
		7: 'O',
		8: null,
		9: 'O'
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

	



	console.log( availableMoves( board ) );



});