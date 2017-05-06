const express = require('express');
const Slapp = require('slapp');
const ConvoStore = require('slapp-convo-beepboop');
const Context = require('slapp-context-beepboop');

const port = process.env.PORT || 3000;

const slapp = Slapp({
  verify_token: process.env.SLACK_VERIFY_TOKEN,
  convo_store: ConvoStore(),
  context: Context()
});

// response to the user typing "help"
slapp.message('help', ['mention', 'direct_message'], (msg) => {
  msg.say('tough')
});

// attach Slapp to express server
var server = slapp.attachToExpress(express());

// start http server
server.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }

  console.log(`Listening on port ${port}`)
});
