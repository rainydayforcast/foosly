const getScope = require('lib/scope');
const state = require('lib/state');

exports.callbackId = require('./id');
exports.name = 'game';
exports.value = 'stop';
exports.callback = async (msg) => {
  const scope = getScope(msg.meta.team_id, msg.meta.channel_id);
  await state.del(scope);
  return msg.respond(msg.body.response_url, require('responses/game-stopped')().json());
};
