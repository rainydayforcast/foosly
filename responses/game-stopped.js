const smb = require('slack-message-builder');

module.exports = () => smb()
  .text('Game stopped.');
