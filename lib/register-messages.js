module.exports = (bot, messages) =>
  messages.map(m =>
    bot.message(
      ...[m.criteria, m.typeFilter, m.callback].filter(Boolean)
    )
  );
