const getScope = require('lib/scope');
const getUser = require('lib/get-user');
const state = require('lib/state');

exports.callbackId = require('./id');
exports.name = 'player';
exports.value = 'join';
exports.callback = async (msg, val) => {
  const scope = getScope(msg.meta.team_id, msg.meta.channel_id);
  const currentGame = await state.get(scope);
  const user = await getUser(msg.meta.bot_token, msg.meta.user_id);
  const name = user.profile.real_name || user.name;
  currentGame.players[msg.meta.user_id] = name;
  await state.set(scope, currentGame);
  return msg.respond(msg.body.response_url, require('responses/current-game')(currentGame).json());
};
