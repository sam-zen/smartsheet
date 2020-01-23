const fetch = require('isomorphic-unfetch');

const fetchData = async ({
  url,
  method = 'POST',
  body,
  headers = {},
  ...params
}) => {
  let defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (Object.keys(headers).length) {
    defaultHeaders = {
      ...defaultHeaders,
      ...headers,
    };
  }
  const options = {
    method,
    headers: { ...defaultHeaders },
    ...params,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(url, options);
  return res.json();
};

module.exports = fetchData;
