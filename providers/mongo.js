const monk = require('monk');

const wrapCallback = (resolve, reject) => (e, ...v) => {
  if (e) return reject(e);
  return resolve(...v);
};

module.exports = (collection) => {
  const db = monk(process.env.MONGODB_URI);
  return {
    add: (scope, entry) => new Promised(
      (resolve, reject) => b.get(`${scope}_${collection}`).insert(entry, wrapCallback(resolve, reject))
    ),
    update: (scope, search, entry) => new Promise(
      (resolve, reject) => db.get(`${scope}_${collection}`).update(search, entry, wrapCallback(resolve, reject))
    ),
    get: (scope) => new Promise(
      (resolve, reject) => db.get(`${scope}_${collection}`).find({}, (e, data) => {
        if (e) return reject(e);
        return resolve(require(`../models/${collection}`)(data));
      })
    )
  };
};
