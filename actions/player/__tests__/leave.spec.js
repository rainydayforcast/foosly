/* eslint-env jest */
const { testFn, args } = require('effects-as-data/test');
const { callback } = require('../leave');
const state = require('effects/commands/state');
const utilities = require('effects/commands/utilities');

describe('stop game', () => {
  it('stops and deletes game', testFn(callback, () => {
    const msg = {
      meta: {
        team_id: '123',
        channel_id: '456',
        bot_token: 'ABC',
        user_id: '789'
      }
    };

    const currentGame = {
      teams: [],
      players: {
        '789': 'Bob',
        '123': 'Will'
      }
    };

    const updatedCurrentGame = {
      teams: [],
      players: {
        '123': 'Will'
      }
    };

    const scope = [msg.meta.team_id, msg.meta.channel_id].join('_');

    const response = require('responses/current-game')(updatedCurrentGame).json();

    // prettier-ignore
    return args(msg)
      .yieldCmd(state.commands.get(scope)).yieldReturns(currentGame)
      .yieldCmd(state.commands.set(scope, updatedCurrentGame)).yieldReturns(null)
      .yieldCmd(utilities.commands.respond(msg, response)).yieldReturns(response)
      .returns(response);
  }));
});
