const { httpGet } = require('./mock-http-interface');

const getArnieQuotes = async (urls) => {
  const funcArr = [];
  for (let url of urls) {
    funcArr.push(httpGet(url));
  }
  const promiseResponses = await Promise.all(funcArr);
  return processPromise(promiseResponses);
};

const processPromise = (promiseResponses) => {
  const results = [];
  for (let promiseRes of promiseResponses) {
    if (promiseRes.status === 200) {
      results.push({
        'Arnie Quote': JSON.parse(promiseRes.body)?.message
      })
    } else {
      results.push({
        'FAILURE': JSON.parse(promiseRes.body)?.message
      })
    }
  }
  return results;
}

module.exports = {
  getArnieQuotes,
};
