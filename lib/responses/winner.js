const smb = require('slack-message-builder');

module.exports = (players, team) => smb()
  .text(`Congrats ${team.map(id => players[id]).join(' and ')}!`);
