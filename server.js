const express = require('express');
const bot = require('bot');
const ConvoStore = require('slapp-convo-beepboop');
const Context = require('slapp-context-beepboop');
const registerMessages = require('lib/register-messages');
const registerActions = require('lib/register-actions');
const port = process.env.PORT || 3000;

registerMessages(bot, [
  require('messages/start')
]);

registerActions(bot, [
  require('actions/game/start'),
  require('actions/game/stop'),
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

  console.log(`Listening on port ${port}`)
});
