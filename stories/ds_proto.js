// prototype for dance story implementation

function triStreamDisplay( output, dance ){
	// first establish the streams
	// a primary outstream, and one for p1 and p2
	var outstream1 = document.createElement( "DIV" );
	var outstream2 = document.createElement( "DIV" );
	var outstream0 = document.createElement( "DIV" );
	outstream1.id = "out1";
	outstream2.id = "out2";
	outstream0.id = "out0";
	document.getElementById( output ).appendChild( outstream1 );
	document.getElementById( output ).appendChild( outstream2 );
	document.getElementById( output ).appendChild( outstream0 );

	send( "out0", dance["distance"] );
	send( "out1", dance["p1"]["earth"] );
	send( "out2", dance["p2"]["earth"] );
	};
