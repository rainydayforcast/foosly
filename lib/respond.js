module.exports = (msg, ...props) => {
  if (msg.body.response_url) {
    return msg.respond(msg.body.response_url, ...props);
  }
  return msg.say(...props);
};
