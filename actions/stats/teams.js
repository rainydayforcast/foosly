const getScope = require('lib/scope');
const getUser = require('lib/get-user');
const state = require('lib/state');
const usersStore = require('stores/users');
const respond = require('lib/respond');
const gamesStore = require('stores/games');

exports.callbackId = require('./id');
exports.name = 'teams';
exports.value = 'teams';
exports.callback = async (msg) => {
  const scope = getScope(msg.meta.team_id, msg.meta.channel_id);
  const games = gamesStore.get(scope);
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
    users.map(user =>
      getUser(msg.meta.bot_token, user.id)
    )
  );

  const userMap = results.reduce((map, data) => {
    map[data.user.id] = data.user.real_name || data.user.name;
    return map;
  }, {});

  msg.say([
    `*Wins* \n ${Object.keys(teams.won).map(team => `${team.split('|').map(player => userMap[player]).join(' and ')} (${teams.won[team]})`).join('\n')}`,
    `*Losses* \n ${Object.keys(teams.lost).map(team => `${team.split('|').map(player => userMap[player]).join(' and ')} (${teams.lost[team]})`).join('\n')}`
  ].join('\n'));
};
