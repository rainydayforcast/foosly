const p = require('beepboop-persist')();

// Create a passthrough that returns a promise
const wrap = (method) =>
  (...props) =>
    new Promise((resolve, reject) =>
      method(...props, (e, v) => {
        if (e) return reject(e);
        return resolve(v);
      })
    );

// Expose
[
  'set',
  'get',
  'mget',
  'del',
  'list'
].forEach(key => exports[key] = wrap(p[key]));
