const getScope = require('lib/scope');
const state = require('lib/state');

exports.callbackId = require('./id');
exports.name = 'team';
exports.callback = async (msg, val) => {
  const scope = getScope(msg.meta.team_id, msg.meta.channel_id);
  const currentGame = await state.get(scope);
};
