const smb = require('slack-message-builder');
const joinCallbackId = require('actions/player/id');
const gameCallbackId = require('actions/game/id');
const join = require('actions/player/join');
const leave = require('actions/player/leave');
const stop = require('actions/game/stop');

module.exports = (currentGame) => smb()
  .text(Object.keys(currentGame.players).length > 1 ? `Current Game:` : `Game started! Who's in?`)
  .attachment()
    .color('#540BAB')
    .callbackId(joinCallbackId)
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
      .style('primary')
      .text(`I'm in!`)
      .type('button')
      .value(join.value)
    .end()
    .button()
      .name(leave.name)
      .text(`I'm out`)
      .type('button')
      .value(leave.value)
    .end()
  .end()
  .attachment()
    .callbackId(gameCallbackId)
    .color('#D32F2F')
    .button()
      .name(stop.name)
      .style('danger')
      .text('Cancel Game')
      .type('button')
      .value(stop.value)
    .end()
  .end();
