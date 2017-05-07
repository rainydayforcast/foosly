const getScope = require('lib/scope');
const state = require('lib/state');
const usersStore = require('stores/users');
const respond = require('lib/respond');

exports.callbackId = require('./id');
exports.name = 'game';
exports.value = 'start';
exports.callback = async (msg) => {
  const scope = getScope(msg.meta.team_id, msg.meta.channel_id);
  const currentGame = await state.get(scope);
  const users = await usersStore.get(scope);

  const rankings = Object.keys(currentGame.players).map(id => {
    return {
      id,
      rank: users.getRankingFor(id)
    };
  }).sort((a, b) => a.rank - b.rank);

  currentGame.teams[0] = [rankings[0].id, rankings[3].id];
  currentGame.teams[1] = [rankings[1].id, rankings[2].id];

  await state.set(scope, currentGame);
  return respond(msg, require('responses/teams')(currentGame.players, currentGame.teams).json());
};
