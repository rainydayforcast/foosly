module.exports = (callback) => async (msg, ...props) => {
  try {
    return await callback(msg, ...props);
  } catch (e) {
    console.log(e);
    return msg.say(require('responses/error')().json());
  }
};
