exports.criteria = '^stats';
exports.typeFilter = 'direct_mention';
exports.callback = async (msg) => {
  return msg.say(require('responses/stats')().json());
};
