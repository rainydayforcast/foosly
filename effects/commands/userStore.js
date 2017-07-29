const createEffects = require('../createEffects');
const store = require('stores/users');

module.exports = createEffects(store, 'userStore');
