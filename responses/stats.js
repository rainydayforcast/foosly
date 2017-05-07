const smb = require('slack-message-builder');
const callbackId = require('actions/stats/id');
const leaderboard = require('actions/stats/leaderboard');

module.exports = (currentGame) => smb()
  .text(`What can I help you with?`)
  .attachment()
    .color('#540BAB')
    .callbackId(callbackId)
    .button()
      .name(leaderboard.name)
      .text(`Leaderboard`)
      .type('button')
      .value(leaderboard.value)
    .end()
  .end();
