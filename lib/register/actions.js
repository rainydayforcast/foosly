const protect = require('./protect');

module.exports = (bot, actions) =>
  actions.map(a =>
    bot.action(
      ...[a.callbackId, a.name, a.value, protect(a.callback)].filter(Boolean)
    )
  );
