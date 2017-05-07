const getScope = require('lib/scope');
const getUser = require('lib/get-user');
const state = require('lib/state');
const join = require('actions/player/join').callback;

exports.criteria = '^start';
exports.typeFilter = 'direct_mention';
exports.callback = async (msg) => {
  const scope = getScope(msg.meta.team_id, msg.meta.channel_id);

  try {
    let currentGame = await state.get(scope);
    const user = await getUser(msg.meta.bot_token, msg.meta.user_id);
    if (!currentGame) {
      currentGame = {
        players: {
          123: 'zzz',
          222: 'ccc'
        },
        teams: []
      };
    }
    await state.set(scope, currentGame);
    return join(msg);
  } catch (e) {
    console.log(e);
    return msg.say(require('responses/error')().json());
  }
};
