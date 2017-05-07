const bot = require('bot');

module.exports = (token, user) => new Promise((resolve, reject) =>
  bot.client.users.info({ token, user }, (e, v) => {
    if (e) return resolve({ name: 'Person' });
    if (e) return reject(e);
    return resolve(v.user);
  })
);
