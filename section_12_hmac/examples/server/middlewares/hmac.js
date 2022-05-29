const { calculateRequestSignature } = require('../../hmac');

const hmacMiddleware = (secret) => (req, _, next) => {
  const receivedSignature = req.headers['auth-signature'];
  const calculatedSignature = calculateRequestSignature(secret, req);

  if (receivedSignature !== calculatedSignature) {
    throw new Error("HMAC request signatures don't match");
  }
  next();
};

module.exports = { hmacMiddleware };
