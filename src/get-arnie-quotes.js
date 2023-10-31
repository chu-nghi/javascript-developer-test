const { httpGet } = require('./mock-http-interface');

const getArnieQuotes = async (urls) => {
  const promises = [];
  for (let url of urls) {
    promises.push(httpGet(url));
  }
  const responses = await Promise.all(promises);
  return processResponses(responses);
};

const processResponses = (responses) => {
  const results = [];
  for (let res of responses) {
    const message = JSON.parse(res.body)?.message;
    if (res.status === 200) {
      results.push({
        'Arnie Quote': message
      })
    } else {
      results.push({
        'FAILURE': message
      })
    }
  }
  return results;
}

module.exports = {
  getArnieQuotes,
};
