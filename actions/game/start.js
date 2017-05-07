const getScope = require('lib/scope');
const state = require('lib/state');
const userStore = require('stores/users');

exports.callbackId = require('./id');
exports.name = 'game';
exports.value = 'start';
exports.callback = async (msg) => {
  const scope = getScope(msg.meta.team_id, msg.meta.channel_id);
  const currentGame = await state.get(scope);
  const users = await userStore.get(scope);

  const rankings = currentGame.players.map(id => {
    return {
      id,
      rank: users.getRankingFor(id)
    };
  }).sort((a, b) => a.rank - b.rank);
  debugger;

  /*
  currentGame.W = [rankings[0].id, rankings[3].id];
  currentGame.M = [rankings[1].id, rankings[2].id];

  response(`*_Team W:_ ${currentGame.W.map(key => currentGame.players[key]).join(', ')}* vs *_Team M:_ ${currentGame.M.map(key => currentGame.players[key]).join(', ')}*`);
  response('Let the foos begin! Type `!win <Team>` with the team name to report the victor.')
  */
};
