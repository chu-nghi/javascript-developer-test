const { httpGet } = require('./mock-http-interface');

const getArnieQuotes = async (urls) => {
  const funcArr = [];
  for (let url of urls) {
    funcArr.push(httpGet(url));
  }
  const responses = await Promise.all(funcArr);
  return processResponse(responses);
};

const processResponse = (responses) => {
  const results = [];
  for (let res of responses) {
    if (res.status === 200) {
      results.push({
        'Arnie Quote': JSON.parse(res.body)?.message
      })
    } else {
      results.push({
        'FAILURE': JSON.parse(res.body)?.message
      })
    }
  }
  return results;
}

module.exports = {
  getArnieQuotes,
};
