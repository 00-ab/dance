function send( field, text ) {
	// requires an output field and a message
	// adds a new <p>
	var par = document.createElement( "P" );
	var textNode = document.createTextNode( String( text ));
	par.appendChild( textNode );

	console.log( field );
	if ( typeof( field ) == "string"){
		document.getElementById( field ).appendChild( par );
	} else if ( typeof( field ) == "object" ){
		field.appendChild( par );
	} else {
		throw( "SEND: Invalid target." );
	};
};
