module.exports = (obj, prefix = '') => Object.keys(obj)
  .reduce((effects, name) => {
    const type = `${prefix}-${name}`;
    effects.commands[name] = (...args) => ({ type, args });
    effects.handlers[type] = ({ args }) => obj[name](...args);

    return effects;
  }, { commands: {}, handlers: {} });
