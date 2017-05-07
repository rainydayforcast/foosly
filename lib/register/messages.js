const protect = require('./protect');

module.exports = (bot, messages) =>
  messages.map(m =>
    bot.message(
      ...[m.criteria, m.typeFilter, protect(m.callback)].filter(Boolean)
    )
  );
