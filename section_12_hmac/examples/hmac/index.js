const crypto = require('crypto');

const getCanonicalQueryString = (query) => {
  const queryParams = new URLSearchParams(query);
  queryParams.sort();
  return queryParams.toString();
};

const getCanonicalHeaders = (headers) => {
  const sortedHeaders = Object.fromEntries(
    Object.entries(headers)
      .map(([name, value]) => [name.toLowerCase(), value])
      .sort((a, b) => a[0].localeCompare(b[0]))
  );

  return Object.entries(sortedHeaders)
    .filter((entry) => entry[0] === 'content-type')
    .map((entry) => entry.join(':'))
    .join('\n');
};

const hashPayload = (payload) => {
  return crypto
    .createHash('sha256')
    .update(payload || '')
    .digest('base64');
};

const getCanonicalRequest = (request) => {
  const queryString = getCanonicalQueryString(request.query);
  const headers = getCanonicalHeaders(request.headers);

  return [
    request.method,
    request.hostname,
    request.path,
    queryString,
    headers,
    hashPayload(JSON.stringify(request.body)),
  ].join('\n');
};

const calculateRequestSignature = (secret, request) => {
  const canonicalRequest = getCanonicalRequest(request);
  const signature = crypto.createHmac('sha256', secret).update(canonicalRequest).digest('base64');

  return signature;
};

module.exports = {
  calculateRequestSignature,
};
