# Leaguer Discord Bot
## Overview
---

This is a Discord bot that was written to keep track of statistics of in-game players (known as "summoners") and alert of changes. This works by accepting tracking commands from users in a Discord server, contacting the Riot Games API and storing summoner information into a local MongoDB database. The information should then be refreshed periodically, checking for changes, and alerting the user who began tracking the summoner through a Discord message to the same server. The project is currently in a WIP state as additional core functionality needs to be implemented.

## Installation
---

This installation assumes that all database operations will occur on a local instance, requiring the installation of MongoDB. Make sure you have the latest version of Node.js and MongoDB installed.

1. Clone this repository into a directory of your choice.

2. In the project root directory, run `npm install` to install the required dependencies.

#### Configuration

There are configuration files that require attention before the bot is able to run. 

* `./config.json` has a field labelled "token" that should be filled with the Discord API token. This requires that an application has been registered at https://discord.com/developers/applications. That application then contains the token for this field under "Bot" settings.

* `./endpoints/riot/config/config.js` has a field labelled "key" that should be filled with the Riot Games API key. This can be found by signing into a Riot Games account with developer access at https://developer.riotgames.com/.

* If your database is not hosted locally (or is on a different port from the MongoDB default), you can configure the database URL by finding the constant `dbURL` within `./index.js`.

## Starting the Bot
---

After the bot has been installed and configured, the bot can start up. If not already added, the bot can be added to the server using the link `https://discord.com/api/oauth2/authorize?client_id=<CLIENT_ID>&permissions=67584&scope=bot` where `<CLIENT_ID>` is replaced with the Discord application's client ID found under "General Information" at the same link where the Discord API token is found.

The bot can then be run by running the terminal command `node index.js` at the project root directory.

## Usage
---
There are two supported (and incomplete) commands that this bot will recognize:

* `!track <summoner_name>` where `<summoner_name>` is replaced with the summoner that the user wishes to track (no quotation marks neccesary for summoner names with spaces!)
* `!untrack <summoner_name>` where `<summoner_name>` is replaced with the summoner that the user wishes to stop tracking

Both of these commands are part of the bot's core functionality to make calls to the Riot Games API and begin/stop tracking summoners. Future commands may include being able to retrieve summoner information only once instead of beginning tracking, as well as granulating the type of information being returned more specifically.

## Future Plans
---

Currently, one of the core functionalities of this bot is to be able to update Discord users when a summoner has changed state (e.g. has started a new game, finished a game). This feature is currently in progress as there have been technical challenges encountered along the way, as well as other bugs and issues that need to be fixed. If this becomes a more long-term project, these bugs will be documented.

Other future plans include hosting this bot externally so there will not be any need for installing and configuring everything locally.
