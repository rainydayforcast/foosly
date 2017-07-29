const smb = require('slack-message-builder');
const callbackId = require('actions/stats/id');
const leaderboard = require('actions/stats/leaderboard');
const teams = require('actions/stats/teams');
const rog = require('actions/stats/rating-over-games');
const feature = require('utilities/feature');

const withoutGraphing = () => smb()
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

const withGraphing = () => smb()
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
    .button()
      .name(rog.name)
      .text(`Rating over Games`)
      .type('button')
      .value(rog.value)
    .end()
  .end();

module.exports = feature('graphing', withoutGraphing)(withGraphing);
