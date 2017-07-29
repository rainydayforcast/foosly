const smb = require('slack-message-builder');

module.exports = (messages) => smb()
  .text(messages.map(m => m.description).join('\n'));
