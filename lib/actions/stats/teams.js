const getScope = require('utilities/scope');
const getUser = require('utilities/get-user');
const gamesStore = require('stores/games');
const respond = require('utilities/respond');

exports.callbackId = require('./id');
exports.name = 'teams';
exports.value = 'teams';
exports.callback = async (msg) => {
  const scope = getScope(msg.meta.team_id, msg.meta.channel_id);
  const games = await gamesStore.get(scope);
  const users = [];
  const teams = games.reduce((map, game) => {
    const winKey = game.winner.sort().join('|');
    map.won[winKey] = (map.won[winKey] || 0) + 1;
    const loseKey = game.loser.sort().join('|');
    map.lost[loseKey] = (map.lost[loseKey] || 0) + 1;

    // Add users
    [].concat(game.winner, game.loser).forEach(u => users.indexOf(u) === -1 && users.push(u));
    return map;
  }, {
    lost: {},
    won: {}
  });

  const results = await Promise.all(
    users.map(id =>
      getUser(msg.meta.bot_token, id)
    )
  );

  const userMap = results.reduce((map, user) => {
    map[user.id] = user.real_name || user.name;
    return map;
  }, {});

  respond(msg, [
    `*Wins* \n ${Object.keys(teams.won).map(team => `${team.split('|').map(player => userMap[player]).join(' and ')} (${teams.won[team]})`).join('\n')}`,
    `*Losses* \n ${Object.keys(teams.lost).map(team => `${team.split('|').map(player => userMap[player]).join(' and ')} (${teams.lost[team]})`).join('\n')}`
  ].join('\n'));
};
