const getScope = require('utilities/scope');
const state = require('effects/commands/state');
const utilities = require('effects/commands/utilities');
const start = require('actions/game/start').callback;

exports.callbackId = require('./id');
exports.name = 'player';
exports.value = 'join';
exports.callback = function* (msg) {
  const scope = getScope(msg.meta.team_id, msg.meta.channel_id);
  const currentGame = yield state.commands.get(scope);
  const user = yield utilities.commands.getUser(msg.meta.bot_token, msg.meta.user_id);
  const name = user.real_name || user.name;
  currentGame.players[msg.meta.user_id] = name;
  yield state.commands.set(scope, currentGame);
  if (Object.keys(currentGame.players).length >= 4) {
    return start(msg);
  }
  return yield utilities.commands.respond(msg, require('responses/current-game')(currentGame).json());
};
