const getScope = require('utilities/scope');
const state = require('effects/commands/state');
const usersStore = require('effects/commands/userStore');
const utilities = require('effects/commands/utilities');

exports.callbackId = require('./id');
exports.name = 'game';
exports.value = 'start';
exports.callback = function* (msg) {
  const scope = getScope(msg.meta.team_id, msg.meta.channel_id);
  const currentGame = yield state.commands.get(scope);
  const users = yield usersStore.commands.get(scope);

  const rankings = Object.keys(currentGame.players).map(id => {
    return {
      id,
      rank: users.getRankingFor(id)
    };
  }).sort((a, b) => a.rank - b.rank);

  currentGame.teams[0] = [rankings[0].id, rankings[3].id];
  currentGame.teams[1] = [rankings[1].id, rankings[2].id];

  yield state.commands.set(scope, currentGame);
  return yield utilities.commands.respond(msg, require('responses/teams')(currentGame.players, currentGame.teams).json());
};
