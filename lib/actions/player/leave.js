const getScope = require('utilities/scope');
const state = require('utilities/state');

exports.callbackId = require('./id');
exports.name = 'player';
exports.value = 'leave';
exports.callback = async (msg) => {
  const scope = getScope(msg.meta.team_id, msg.meta.channel_id);
  const currentGame = await state.get(scope);
  delete currentGame.players[msg.meta.user_id];
  await state.set(scope, currentGame);
  return msg.respond(msg.body.response_url, require('responses/current-game')(currentGame).json());
};
