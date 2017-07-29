exports.description = '`@foosly stats` - lists statistics for the current channel';
exports.criteria = '^stats';
exports.typeFilter = 'direct_mention';
exports.callback = async (msg) => {
  const stats = require('responses/stats');
  const message = await stats(msg);
  return msg.say(message.json());
};
