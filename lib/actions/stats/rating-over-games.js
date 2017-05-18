const getScope = require('utilities/scope');
const getUser = require('utilities/get-user');
const usersStore = require('stores/users');
const respond = require('utilities/respond');
const request = require('request-promise-native');
const smb = require('slack-message-builder');

exports.callbackId = require('./id');
exports.name = 'rating-over-games';
exports.value = 'rating-over-games';
exports.callback = async (msg) => {
  const scope = getScope(msg.meta.team_id, msg.meta.channel_id);
  const users = await usersStore.get(scope);
  const results = await Promise.all(
    users.map(user =>
      getUser(msg.meta.bot_token, user.id)
    )
  );

  const userMap = results.reduce((map, user) => {
    map[user.id] = user.real_name || user.name;
    return map;
  }, {});

  const body = users.map(user => ({
    x: [user.wins + user.losses],
    y: [users.getRankingForPretty(user.id)],
    name: userMap[user.id] || 'blah'
  }));

  const result = await request({
    uri: `${process.env.GRAPHING_URI_BASE}/scatter`,
    method: 'POST',
    json: true,
    body
  });
  respond(msg,
    require('responses/stats')(msg)
    .attachment()
      .fallback('Graph: Ratings over games')
      .imageUrl(`${process.env.GRAPHING_URI_BASE}/${result.path}`)
    .end()
  .json());
};
