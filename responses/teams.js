const smb = require('slack-message-builder');
const teamCallbackId = require('actions/team/id');
const win = require('actions/team/win');

const colors = ['#D32F2F', '#03A9F4'];

module.exports = (players, teams) => teams.reduce((message, team, index) =>
  message.attachment()
    .color(colors[index])
    .text(`Team ${index + 1}`)
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
      .text(`Team ${index + 1} Won`)
      .type('button')
      .value(index)
    .end()
  .end()
, smb().text('Let the foos begin!'));
