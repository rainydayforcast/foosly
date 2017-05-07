const getScope = require('lib/scope');
const getUser = require('lib/get-user');
const state = require('lib/state');

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
        teams: {}
      };
    }

    currentGame.players[msg.meta.user_id] = user.profile.real_name || user.name
    await state.set(scope, currentGame);
    return msg.say(require('responses/current-game')(currentGame).json());
  } catch (e) {
    console.log(e);
    return msg.say(require('responses/error')().json());
  }
};
