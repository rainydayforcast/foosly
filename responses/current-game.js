const smb = require('slack-message-builder');
const callbackId = require('actions/player/id');
const join = require('actions/player/join');
const leave = require('actions/player/leave');

module.exports = (currentGame) => smb()
  .text(Object.keys(currentGame.players).length > 1 ? `Current Game:` : `Game started! Who's in?`)
  .attachment()
    .callbackId(callbackId)
    .field()
      .title('Players')
      .value(
        Object.keys(currentGame.players)
        .map(id => currentGame.players[id])
        .join('\n'))
      .short(false)
    .end()
    .button()
      .name(join.name)
      .text('Join')
      .type('button')
      .value(join.value)
    .end()
    .button()
      .name(leave.name)
      .text('Leave')
      .type('button')
      .value(leave.value)
    .end()
  .end();
