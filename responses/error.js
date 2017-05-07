const smb = require('slack-message-builder');

module.exports = () => smb()
  .text('Sorry, something went wrong!');
