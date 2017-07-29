const getScope = require('utilities/scope');
const state = require('effects/commands/state');
const utilities = require('effects/commands/utilities');

exports.callbackId = require('./id');
exports.name = 'game';
exports.value = 'stop';
exports.callback = function* (msg) {
  const scope = getScope(msg.meta.team_id, msg.meta.channel_id);
  yield state.commands.del(scope);
  return yield utilities.commands.respond(msg, require('responses/game-stopped')().json());
};
