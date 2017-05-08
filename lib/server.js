const express = require('express');
const bot = require('bot');
const registerMessages = require('utilities/register/messages');
const registerActions = require('utilities/register/actions');
const port = process.env.PORT || 3000;

registerMessages(bot, require('messages'));

registerActions(bot, [
  require('actions/game/start'),
  require('actions/game/stop'),
  require('actions/stats/leaderboard'),
  require('actions/stats/teams'),
  require('actions/player/join'),
  require('actions/player/leave'),
  require('actions/team/win')
]);

// attach Slapp to express server
var server = bot.attachToExpress(express());

// start http server
server.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
});
