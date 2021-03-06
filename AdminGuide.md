# Alice docs for Admins/Moderators
This document serves as a point of reference for ingame Administrators/Moderators of Alice based servers.


## General Usage
Alice was designed to make moderating servers easy and intuitive, as such a lot of the commands and functionality come across as simple but require a little getting used to. Using most commands that require parameters without the parameters will tell the user how it's meant to be used.


## Command Parameters
Parameters are the inputs that the commands take, they directly influence how the command executes and what it does.

Parameter descriptions are wrapped in either an optional (`[]`) or required parameter (`<>`):
```
!command <required parameter> [optional element]
```
All parameters are positionally dependent unless stated otherwise.

### General Parameter Details
##### `[<id/partial name>]`
Takes a slot ID or part of a player's name that is currently connected to the server. When using a partial name, generally names are case in-sensitive. If your search is too wide (aka you have entered a single letter into the search other than a slot ID) then Alice will tell you to narrow your search parameter.

ID usually takes precedence above partial names, for example if you had a player on the server with the name '6' and you attempted to issue `!ban 6 Wallhack` this will ban the player on slot ID 6 **not** the player with the name '6'. To ban this player, one might issue `!p [page]` and search for the player's slot ID and ban him on his slot ID.

So be careful when issueing potentially dangerous or destructive commands with parameters that take `[<id/partial name>]`.

##### `[<partial name>]`
Only does a partial name search, does not check ID. This particular parameter restriction is applied to public/fun commands to avoid players being able to exploit the slot ID search functionality to determine which player is on which slot ID.

##### `[<time macro>]`
Time Macros decribe a length of time in a single macro. It can be in weeks, days, hours or minutes or a combination of the 4. These time segments in a time macro are represented by `w`, `d`, `h`, `m` respectively.

Here's some examples:
```
5d1m (5 days and 1 minute)
1w9h (1 week and 9 days)
2w4d48m (2 weeks, 4 days and 48 minutes)
```


## Commands

#### General Commands
##### `!perm [id/partial name]`
Checks the permissions of a player (only if the moderator that issues this command has the permissions to issue a targeted permission check). If no parameter is passed, then the player who issued this command will be shown their own permissions on the server.

#### Admin Commands
##### `!b/ban <id/partial name> <reason>`
Bans a player based on ID or partial name, with a reason. Reasons can contain spaces however the id/partial name cannot contain any sort of spaces at all.

##### `!tb/tempban <id/partial name> <time macro> <reason>`
Temporarily bans a player for `<time macro>` amount of time. Only `<reason>` can contain spaces. Refer to the `[<time macro>]` description above for an explaination on time macros.

##### `!mute <id/partial name>`
Mutes a player's chat until they either leave the server and rejoin or until an admin `!unmute`s them. The player is shown a message when muted and when attempting to say something in the chat. It will also warn them that they are muted once the command is issued.

##### `!unmute <id/partial name>`
Unmutes a player from mute. Command only works if the player is muted.

##### `!map <map name> [gametype]`
Changes map to `<map name>`. Optionally Gametype can be specified. Use `!maps` or `!gametypes` to see what maps or gametypes are available.

#### Fun Commands
##### `!pizza [partial name]`
When no partial name is supplied, the player will eat a pizza. If a player name is specified it will send a pizza to the specified player.

#### General Commands
##### `!nm`
Displays the next map in the rotation.