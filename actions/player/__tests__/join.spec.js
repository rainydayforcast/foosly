/* eslint-env jest */
const { testFn, args } = require('effects-as-data/test');
const { callback } = require('../join');
const state = require('effects/commands/state');
const utilities = require('effects/commands/utilities');

const msg = {
  meta: {
    team_id: '123',
    channel_id: '456',
    bot_token: 'ABC',
    user_id: '789'
  }
};

const scope = [msg.meta.team_id, msg.meta.channel_id].join('_');

const currentGame = {
  teams: [],
  players: {}
};


describe('join game (waiting for players)', () => {
  it('uses user rankings and returns the teams', testFn(callback, () => {
    const user = {
      real_name: 'Bob',
      name: 'Bob'
    };

    const updatedCurrentGame = Object.assign({}, currentGame, {
      players: { [msg.meta.user_id]: user.real_name },
    });

    const response = require('responses/current-game')(updatedCurrentGame).json();

    // prettier-ignore
    return args(msg)
      .yieldCmd(state.commands.get(scope)).yieldReturns(currentGame)
      .yieldCmd(utilities.commands.getUser(msg.meta.bot_token, msg.meta.user_id)).yieldReturns(user)
      .yieldCmd(state.commands.set(scope, updatedCurrentGame)).yieldReturns(null)
      .yieldCmd(utilities.commands.respond(msg, response)).yieldReturns(response)
      .returns(response);
  }));

  it('uses the the user `name` if `real_name` doesn\'t exist', testFn(callback, () => {
    const user = {
      name: 'Bob'
    };

    const updatedCurrentGame = Object.assign({}, currentGame, {
      players: { [msg.meta.user_id]: user.name },
    });

    const response = require('responses/current-game')(updatedCurrentGame).json();

    // prettier-ignore
    return args(msg)
      .yieldCmd(state.commands.get(scope)).yieldReturns(currentGame)
      .yieldCmd(utilities.commands.getUser(msg.meta.bot_token, msg.meta.user_id)).yieldReturns(user)
      .yieldCmd(state.commands.set(scope, updatedCurrentGame)).yieldReturns(null)
      .yieldCmd(utilities.commands.respond(msg, response)).yieldReturns(response)
      .returns(response);
  }));

  it.skip('starts the game if there are 4 players', testFn(callback, () => {
    const user = {
      name: 'Bob'
    };

    const threePlayerGame = {
      teams: [],
      players: {
        1: 'Will',
        2: 'Bill',
        3: 'Phil',
      }
    };

    const updatedCurrentGame = Object.assign({}, threePlayerGame, {
      players: Object.assign({}, threePlayerGame.players, {
        [msg.meta.user_id]: user.name
      })
    });

    // prettier-ignore
    return args(msg)
      .yieldCmd(state.commands.get(scope)).yieldReturns(threePlayerGame)
      .yieldCmd(utilities.commands.getUser(msg.meta.bot_token, msg.meta.user_id)).yieldReturns(user)
      .yieldCmd(state.commands.set(scope, updatedCurrentGame)).yieldReturns(null)
      .yieldCmd({}).yieldReturns(null)
      .returns(null);
  }));
});
