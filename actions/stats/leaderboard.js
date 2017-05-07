const getScope = require('lib/scope');
const getUser = require('lib/get-user');
const state = require('lib/state');
const usersStore = require('stores/users');
const respond = require('lib/respond');

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
    return respond(msg, require('responses/leaderboard')(
      rankings.map((user, index) =>
        `${index + 1}) ${userMap[user.id]} (${users.getRankingForPretty(user.id)}%)`
      ).join('\n')
    ).json());
  } else {
    return respond(msg, 'No rankings. Go play some foosball!');
  }
};
