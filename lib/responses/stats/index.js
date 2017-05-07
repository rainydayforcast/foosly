const smb = require('slack-message-builder');
const callbackId = require('actions/stats/id');
const leaderboard = require('actions/stats/leaderboard');
const teams = require('actions/stats/teams');

module.exports = () => smb()
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
    .button()
      .name(teams.name)
      .text(`By Teams`)
      .type('button')
      .value(teams.value)
    .end()
  .end();
