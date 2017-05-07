const getScope = require('utilities/scope');
const getUser = require('utilities/get-user');
const state = require('utilities/state');
const respond = require('utilities/respond');
const start = require('actions/game/start').callback;

exports.callbackId = require('./id');
exports.name = 'player';
exports.value = 'join';
exports.callback = async (msg) => {
  const scope = getScope(msg.meta.team_id, msg.meta.channel_id);
  const currentGame = await state.get(scope);
  const user = await getUser(msg.meta.bot_token, msg.meta.user_id);
  const name = user.real_name || user.name;
  currentGame.players[msg.meta.user_id] = name;
  await state.set(scope, currentGame);
  if (Object.keys(currentGame.players).length >= 4) {
    return start(msg);
  }
  return respond(msg, require('responses/current-game')(currentGame).json());
};
