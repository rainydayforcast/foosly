const redis = require('redis');
const client = redis.createClient({ url: process.env.REDIS_URI });

module.exports = (feature, msg) => new Promise((resolve, reject) =>
  client.hget(msg.meta.team_id, feature, (error, value) => {
    if (error) return reject(error);
    return resolve(value);
  })
);
