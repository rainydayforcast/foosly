const getScope = require('utilities/scope');
const getUser = require('utilities/get-user');
const usersStore = require('stores/users');
const respond = require('utilities/respond');

exports.callbackId = require('./id');
exports.name = 'leaderboard';
exports.value = 'leaderboard';
exports.callback = async (msg) => {
  const scope = getScope(msg.meta.team_id, msg.meta.channel_id);
  const users = await usersStore.get(scope);
  const rankings = users.rank().reverse().slice(0, 20);
  const results = await Promise.all(
    rankings.map(user =>
      getUser(msg.meta.bot_token, user.id)
    )
  );

  const userMap = results.reduce((map, user) => {
    map[user.id] = user.real_name || user.name;
    return map;
  }, {});

  if (rankings.length){
    return respond(msg, require('responses/stats/leaderboard')(
      rankings.map((user, index) =>
        `${index + 1}) ${userMap[user.id]} (${users.getRankingForPretty(user.id)}%)`
      ).join('\n')
    ).json());
  } else {
    return respond(msg, 'No rankings. Go play!');
  }
};
