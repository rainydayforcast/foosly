const getScope = require('utilities/scope');
const state = require('effects/commands/state');
const utilities = require('effects/commands/utilities');

exports.callbackId = require('./id');
exports.name = 'player';
exports.value = 'leave';
exports.callback = function* (msg) {
  const scope = getScope(msg.meta.team_id, msg.meta.channel_id);
  const currentGame = yield state.commands.get(scope);
  delete currentGame.players[msg.meta.user_id];
  yield state.commands.set(scope, currentGame);
  return yield utilities.commands.respond(msg, require('responses/current-game')(currentGame).json());
};
