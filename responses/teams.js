const smb = require('slack-message-builder');
const teamCallbackId = require('actions/team/id');
const win = require('actions/team/win');

module.exports = (players, teams) => teams.reduce((message, team, index) =>
  message.attachment()
    .text(`Team ${index}`)
    .callbackId(teamCallbackId)
    .field()
      .title('Players')
      .value(
        team.map(id => players[id])
        .join('\n')
      )
      .short(false)
    .end()
    .button()
      .name(win.name)
      .text(`Team ${index} Won`)
      .type('button')
      .value(index)
    .end()
  .end()
, smb().text('Let the foos begin!'));
