const smb = require('slack-message-builder');

module.exports = (text) => smb()
  .text(text);
