/* eslint-env jest */
const { testFn, args } = require('effects-as-data/test');
const { callback } = require('../stop');
const state = require('effects/commands/state');
const utilities = require('effects/commands/utilities');

describe('stop game', () => {
  it('stops and deletes game', testFn(callback, () => {
    const msg = {
      meta: {
        team_id: '123',
        channel_id: '456'
      }
    };

    const scope = [msg.meta.team_id, msg.meta.channel_id].join('_');

    const response = require('responses/game-stopped')().json();

    // prettier-ignore
    return args(msg)
      .yieldCmd(state.commands.del(scope)).yieldReturns(null)
      .yieldCmd(utilities.commands.respond(msg, response)).yieldReturns(response)
      .returns(response);
  }));
});
