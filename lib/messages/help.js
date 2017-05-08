exports.description = '`@foosly help` - lists available commands';
exports.criteria = '^help';
exports.typeFilter = 'direct_mention';
exports.callback = async (msg) => {
  return msg.say(require('responses/help')(require('messages')).json());
};
