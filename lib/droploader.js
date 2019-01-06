
'use strict';
( function( $ ) {

	$.fn.droploader = function( options ) {

		options = $.extend( {
			'onload' : $.noop,
		}, options );

		const ShowError = ( function() {
			const dialog = window.Dialog? new Dialog(): { 'open' : alert.bind( window ) };
			return dialog.open.bind( dialog );
		} )();

		// feature detection for drag&drop upload
		const [ isFileReaderSupported, isDragDropSupported ] = function() {
			var div = document.createElement( 'div' );
			return [ ( 'draggable' in div ) || ( 'ondragstart' in div && 'ondrop' in div ), 'FileReader' in window ];
		}();

		if ( !isFileReaderSupported ) {
			ShowError( 'Dude.. Please use a normal modern browser, like Chrome or something.' );
			return;
		}

		// applying the effect for every form]
		const $uploadWrap  = $( this )
			.addClass( 'droploader' )
				.html( `
					<div class="box__input">
						<svg class="box__icon" xmlns="http://www.w3.org/2000/svg" width="50" height="43" viewBox="0 0 50 43"><path d="M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z"/></svg>
						<input type="file" name="files[]" id="file" class="box__file" />
						<label for="file"><strong>Choose a file</strong><span class="box__dragndrop"> or drag it here</span>.</label>
					</div>
				` ),
			$input = $uploadWrap.find( 'input[type="file"]' );

		$input.on( 'change', function( e ) {
			options.onload( e.target.files );
		} );

		// drag&drop files if the feature is available
		if( isDragDropSupported ) {
			$uploadWrap
				.addClass( 'has-advanced-upload' ) // letting the CSS part to know drag&drop is supported by the browser
				.on( 'drag dragstart dragend dragover dragenter dragleave drop', function( e ) {
					// preventing the unwanted behaviours
					e.preventDefault();
					e.stopPropagation();
				} )
				.on( 'dragover dragenter', function() {
					$uploadWrap.addClass( 'is-dragover' );
				} )
				.on( 'dragleave dragend drop', function() {
					$uploadWrap.removeClass( 'is-dragover' );
				} )
				.on( 'drop', function( e ) {
					options.onload( e.originalEvent.dataTransfer.files );
				} );
		}

	};

} )( jQuery );
