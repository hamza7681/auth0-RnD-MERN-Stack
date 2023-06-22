const { auth } = require("express-oauth2-jwt-bearer");

const jwtCheck = auth({
  audience: "this is an unique identifier",
  issuerBaseURL: "https://dev-pn2f5fdj1qc5k1jf.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

module.exports = jwtCheck;
