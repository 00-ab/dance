// calibration variables used in ACTIONS

var SMALL = 0.1;
var MED = 0.2;
var LARGE = 0.4;

// lists, used mainly for iteration and legality checks

playerList = [ "p1", "p2" ];
actionList = [ "advance", "retreat", "touch", "evade", "breathe", "jest" ];
elementList = [ "earth", "air", "fire", "water" ];

// UTILITY FUNCTIONS
// used for assorted minor tasks

function setupPlayer( majorElems )
//accepts a list of 4 major element values (eafw)
//returns a complete player object (with majors and minors)
{
	var player = new Array();

	//setup major and minor elements
	player["earth"] = majorElems[0];
	player["will"] = player["earth"];

	player["air"] = majorElems[1];
	player["cool"] = player["air"];
	
	player["fire"] = majorElems[2];
	player["heat"] = player["fire"] / 2;
	
	player["water"] = majorElems[3];
	player["balance"] = 0;
	
	//setup enable/disable actions
	player["advance"] = 1;
	player["retreat"] = 1;
	player["touch"] = 1;
	player["evade"] = 1;
	player["breathe"] = 1;
	player["jest"] = 1;

	//setup choice
	player["choice"] = "";

	return player;
};

function allFlags()
// constructs a dictionary of all possible flags and returns it
// called by setStage()
// to be used in conjuction with ../tools/narrateFlags.js
{
	var flagsList = [
		"gameStart", 	// if the game started this turn
		"gameOver",	// if the game ended this turn
		"p1dodge",	// if player one used evade successfully against advance or touch
		"p2dodge",	// read the above and think a bit
		"dance",	// if from dist=0 one player advanced and the other retreated, resulting in d=0
		];

	var flagsDict = new Array();
	for ( n in flagsList)
	{
		flagsDict[ flagsList[n] ] = 0;
	}

	return flagsDict;
};

// ACTION FUNCTIONS
// describe the behavior of each move
function advance( actor, target, dance0, dance1 )
{
	return dance1
};

function retreat( actor, target, dance0, dance1 )
{
	return dance1
};

function touch( actor, target, dance0, dance1 )
{
	return dance1
};

function evade( actor, target, dance0, dance1 )
{
	return dance1
};

function breathe( actor, target, dance0, dance1 )
{
	return dance1
};

function jest( actor, target, dance0, dance1 )
{
	return dance1
};

// ELEMENT CHECK FUNCTIONS
// deal mainly with minimums and maximums

function elementChecks( dance )
{
	for ( n = 0 ; n < playerList.length; ++n )
	{
		var player = playerList[n];
		console.log( "player in elementChecks: " + player );
		dance = airCheck( dance, player );
		dance = fireCheck( dance, player );
		dance = waterCheck( dance, player );
		dance = earthCheck( dance, player );
	}
	// earth must be checked last since all rollovers flow into it
	return dance;
};

function earthCheck( dance, player )
// earth forms the maximum for will.
// there's no need to check minimums here, because gameoverCheck() deals with that
{
	if (dance[player]["will"] > dance[player]["earth"])
	{
		dance[player]["will"] = dance[player]["earth"]
	};
	return dance;
};

function airCheck( dance, player )
// air forms the maximum for cool. 0 is always the minimum
{
	console.log( player );
	// no penalty for cool over maximum
	if (dance[player]["cool"] > dance[player]["air"])
	{
		dance[player]["cool"] = dance[player]["air"];
	};

	// cool under 0 results in will damage
	if (dance[player]["cool"] < 0)
	{
		difference = abs( dance[player]["cool"] );
		dance[player]["will"] -= difference;
		dance[player]["cool"] = 0;
	};

	return dance;
};

function fireCheck( dance, player )
// fire forms the maximum for heat. 0 is always the minimum
{
	// heat over maximum results in will damage
	if (dance[player]["heat"] > dance[player]["fire"])
	{
		difference = dance[player]["heat"] - dance[player]["fire"];
		dance[player]["will"] -= difference;
		dance[player]["heat"] = 0;
	};

	// heat under minimum results in will damage
	if (dance[player]["heat"] < 0)
	{
		difference = abs( dance[player]["heat"] );
		dance[player]["will"] -= difference;
		dance[player]["heat"] = 0;
	};	
	return dance;
};

function waterCheck( dance, player )
// water forms the maximum for heat, and negative water is the minimum
// this situation is unlikely to arise.
{
	water = dance[player]["water"];
	balance = dance[player]["balance"];

	if ( balance > water || balance < -water )
	{
		difference = abs( balance ) - water;
		dance[player]["will"] -= difference;
		if (balance < 0)
		{
			dance[player]["balance"] = -dance[player]["water"];
		}
		else if (balance > 0)
		{
			dance[player]["balance"] = dance[player]["water"];
		};
	}

	return dance;
};


// API FUNCTIONS
//

function setStage( p1, p2, d0 )
// accepts two major player arrays (ie [e,a,f,w] ) and initial distance
// returns a complete game object
{
	var dance = new Array();
	dance["p1"] = setupPlayer( p1 );
	dance["p2"] = setupPlayer( p2 );
	dance["distance"] = d0;
	dance["gameover"] = 0;
	dance["flags"] = new Array();

	dance["flags"] = allFlags();

	return dance;
};

function turn( dance )
// accepts a dance object as created by setStage.
// p1.choice and p2.choice should have been changed by the client
// executes these choices and returns the new state of the dance
{
};

function test()
{

	var p1pre = [ 10, 10, 10, 10 ];
	var p2pre = [ 10, 10, 10, 10 ];
	var dance = setStage( p1pre, p2pre, 1 );

	dance["p1"]["cool"] += 5; // this should result in will damage but it doesn't
	dance = elementChecks( dance );
	console.log( dance );
};
