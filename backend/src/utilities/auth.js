const OktaJwtVerifier = require('@okta/jwt-verifier');

const jwtVerifier = new OktaJwtVerifier({
  issuer: process.env.OKTA_ISSUER,
  assertClaims: {
    aud: 'api://default'
  }
});

const checkOktaAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      res.status(401).json({
        message: 'Authorization header is required'
      });
      return;
    }

    const accessToken = req.headers.authorization.trim().split(' ')[1];
    await jwtVerifier.verifyAccessToken(accessToken, 'api://default');
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkOktaAuth
};
