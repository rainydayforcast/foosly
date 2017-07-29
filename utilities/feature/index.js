const check = require('./check');

module.exports = (feature, inactive) => active => async (...props) => {
  if (await check(feature, ...props)) {
    return active(...props);
  }
  return inactive(...props);
};
