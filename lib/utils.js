
/*==*==*==*==*==*==*==*==*
 *     General Utils     *
 *==*==*==*==*==*==*==*==*/

/*
 * KeyCodes constants
 */
const KEYCODES    = {

	'BACKSPACE' : 8,
	'BKSP'      : 8,
	'DELETE'    : 46,
	'ESC'       : 27,
	'ESCAPE'    : 27,
	'SPACE'     : 32,

	'TAB'       : 9,
	'ENTER'     : 13,

	'SHIFT'     : 16,
	'CTRL'      : 17,
	'CONTROL'   : 17,
	'ALT'       : 18,

	'C'         : 67,
	'COPY'      : 67,
	'V'         : 86,
	'PASTE'     : 86,

	'PAGEUP'    : 33,
	'PAGEDOWN'  : 34,
	'END'       : 35,
	'HOME'      : 36,

	'F1'        : 112,
	'F12'       : 123,

	'LEFT'      : 37,
	'UP'        : 38,
	'RIGHT'     : 39,
	'DOWN'      : 40,

	'NUM0'      : 48,
	'NUM9'      : 57,
	'NUMPAD0'   : 96,
	'NUMPAD9'   : 105,

};



/*
 * jQuery extend
 */
( function( $ ) {

	$.fn.extend( {
		'isOrHas' : function( elm ) {
			elm = elm || document.activeElement;
			return this.is( elm ) || this.has( elm ).length;
		},
	} );

} )( jQuery );



/*
 * Dialog
 */
function Dialog( msg ) {

	const $dialog   = $( '<dialog>' )
		.appendTo( document.body );

	const $content  = $( '<div class="content">' )
		.html( msg )
		.click( selectText )
		.appendTo( $dialog );

	const $closeBtn = $( '<button>' )
		.addClass( 'closeBtn' )
		.html( 'Close' )
		.click( close )
		.appendTo( $dialog );

	$( document )
		.click( function( e ) {
			if ( !$dialog.isOrHas( e.target ) ) close();
		} )
		.keydown( function( e ) {
			if ( e.which === KEYCODES.ESC ) close();
		} );

	function selectText() {

		getSelection().selectAllChildren( $content[ 0 ] );

	}

	function open( msg ) {

		if ( msg ) $content.html( msg );
		$dialog.prop( 'open', true );

	}

	function close() {

		$dialog.prop( 'open', false );

	}

	return {
		open,
		close,
	};

}


