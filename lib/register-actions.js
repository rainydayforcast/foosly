module.exports = (bot, actions) =>
  actions.map(a =>
    bot.action(
      ...[a.callbackId, a.name, a.value, a.callback].filter(Boolean)
    )
  );
