var Wonderland = require('./Wonderland.js');
var Bang       = require('./Bang.js');       // In-game command handler
var Utils      = require('./Utils.js');      // General utilities
var Commands   = require('./Commands.js');   // In-game commands

/***********************************************\
|* GLOBALS
\***********************************************/
var wonderland = null;
var bang = null;
var databaseConn = null;

/***********************************************\
|* EVENT TRIGGERS
\***********************************************/

function OnAliceInit()
{
	console.log("Binding events to Alice");
	
	// Wonderland binds
	wonderland.BindFunctionToEvent(OnJoinRequest, 'joinreq');
	wonderland.BindFunctionToEvent(OnJoin, 'join');
	wonderland.BindFunctionToEvent(OnDisconnect, 'disconnect');
	wonderland.BindFunctionToEvent(OnPlayerChat, 'chat');
	wonderland.BindFunctionToEvent(OnPlayerChangeName, 'namechange');
	wonderland.BindFunctionToEvent(OnStatusRequest, 'statusreq');
}

function OnPlayerChat(player, message)
{
	cmdResult = bang.Execute(player, message);

	// If it was not a command then produce normal chat
	if(cmdResult === 0)
	{
		console.log('[' + player.GetSlotID() + '] ' + player.GetName() + ': ' + message);
		wonderland.BroadcastChat(player.GetName() + ": " + message);
	}
	// No such command
	else if(cmdResult === 2)
	{
		player.Tell("^1No such command");
	}
	// No permissions for command
	else if(cmdResult === 4)
	{
		player.Tell("^1You do not have permissions for that");
	}

}

function OnPlayerChangeName(player, newName)
{
	var acceptNewName = false;

	// If the player is signed into Sigil then change his name, otherwise limit name
	// change to 3 times a session. (Session lasts as long as the player is on the server).
	if(player.IsSignedIntoSigil())
		acceptNewName = true;
	else
	{
		if(player.GetTimesChangedName() >= 3)
			player.Tell("^1You may only change your name 3 times during your session." +
						"You must disconnect then reconnect if you wish to change your name again.");
		else
			acceptNewName = true;
	}
		
	if(acceptNewName === true)
		player.SetName(newName);
}

function OnJoinRequest(ipAddress, geoData)
{
	// Search the database for any bans matching the IP
	var sql  = 'SELECT \
					id, \
					player_name, \
					player_ip, \
					reason \
				FROM \
					bans \
				WHERE \
					player_ip=? AND banned=1';
	databaseConn.query(sql, [ipAddress], function(err, result)
	{
		var resultSize = result.length;

		// If there is no result then let them join of course, otherwise
		// deny the IP and tell them why they are banned.
		if(resultSize <= 0)
			wonderland.JoinRequestAccept(ipAddress);
		else
		{
			var message = "^1= You are banned =\n" +
						  "^1/----------------------------------------------------------------\\\n" +
						  "^7Your ban ID is ^1" + result[0].id + "^7\n" +
						  "You are banned for: \n^1" + result[0].reason + "\n"+
						  "^1\\----------------------------------------------------------------/";
			wonderland.JoinRequestDeny(ipAddress, message);
		}
	});
}

function OnJoin(player)
{
	console.log(player.GetName() + " has joined the server on slot " + player.GetSlotID() + " with IP " + player.GetIP());
}

function OnDisconnect(player)
{
	console.log(player.GetName() + " has left");
}

function OnStatusRequest()
{
	console.log("Status requested");
}

function Main()
{
	wonderland   = new Wonderland();
	bang         = new Bang(wonderland);
	databaseConn = wonderland._db._dbConn;
	
	wonderland.BindFunctionToEvent(OnAliceInit, 'aliceinit');
	
	// Admin commands
	bang.RegisterCommand("perm", null, 1, Commands.Perm);
	bang.RegisterCommand("kick", "kick", 2, Commands.Kick); bang.RegisterCommand("k", "kick", 2, Commands.Kick);
	bang.RegisterCommand("geo", "geo", 1, Commands.Geo);
	bang.RegisterCommand("plist", "plist", 1, Commands.ListPlayers);

	// Fun commands
	bang.RegisterCommand("ping", null, 0, Commands.Ping);
	bang.RegisterCommand("pizza", null, 1, Commands.Pizza);
}

Main();