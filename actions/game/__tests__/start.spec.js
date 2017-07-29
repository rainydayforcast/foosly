/* eslint-env jest */
const { testFn, args } = require('effects-as-data/test');
const { callback } = require('../start');
const state = require('effects/commands/state');
const usersStore = require('effects/commands/userStore');
const utilities = require('effects/commands/utilities');

describe('start game (create teams)', () => {
  it('uses user rankings and returns the teams', testFn(callback, () => {
    const msg = {
      meta: {
        team_id: '123',
        channel_id: '456'
      }
    };

    const scope = [msg.meta.team_id, msg.meta.channel_id].join('_');

    const currentGame = {
      teams: [],
      players: {
        1: 1,
        2: 2,
        3: 3,
        4: 4
      }
    };

    const users = {
      getRankingFor: id => id
    };

    const currentGameWithTeams = Object.assign({}, currentGame, {
      teams: [['1','4'], ['2', '3']],
    });

    const response = require('responses/teams')(currentGameWithTeams.players, currentGameWithTeams.teams).json();

    // prettier-ignore
    return args(msg)
      .yieldCmd(state.commands.get(scope)).yieldReturns(currentGame)
      .yieldCmd(usersStore.commands.get(scope)).yieldReturns(users)
      .yieldCmd(state.commands.set(scope, currentGameWithTeams)).yieldReturns(null)
      .yieldCmd(utilities.commands.respond(msg, response)).yieldReturns(response)
      .returns(response);
  }));
});
