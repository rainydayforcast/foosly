exports.description = '`@foosly stats` - lists statistics for the current channel';
exports.criteria = '^stats';
exports.typeFilter = 'direct_mention';
exports.callback = async (msg) => {
  const message = require('responses/stats');
  return msg.say(message(msg).json());
};
