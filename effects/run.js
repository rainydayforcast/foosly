const { call } = require('effects-as-data');
const stateCommands = require('./commands/state') ;
const utilitiesCommands = require('./commands/utilities') ;
const userStoreCommands = require('./commands/userStore') ;

const handlers = Object.assign({},
  utilitiesCommands.handlers,
  userStoreCommands.handlers,
  stateCommands.handlers
);

const config = {};

module.exports = (callback) => (...args) => call(config, handlers, callback, ...args);
