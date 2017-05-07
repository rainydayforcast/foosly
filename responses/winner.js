const smb = require('slack-message-builder');
const win = require('actions/team/win');

module.exports = (players, team) => smb()
  .text(`Congrats ${team.map(id => players[id]).join(' and ')}!`)
