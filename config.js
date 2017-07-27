let user, pass, accessToken, clientID, storeHash;

switch (process.env.ENV){
  case 'production':
    user = process.env.USER;
    pass = process.env.PASS;
    accessToken = process.env.ACCESS_TOKEN;
    clientID = process.env.CLIENT_ID;
    storeHash = process.env.STORE_HASH;
    break;
  default:
    const config = require('./config.json');
    user = config.user;
    pass = config.pass;
    accessToken = config.accessToken;
    clientID = config.clientID;
    storeHash = config.storeHash;
}

module.exports = {
  user,
  pass,
  accessToken,
  clientID,
  storeHash
};