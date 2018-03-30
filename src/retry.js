const delayPromise = delay => data =>
  new Promise((resolve, reject) => {
    setTimeout(() => { resolve(data) }, delay)
  })

const retry = (delay, howManyTimes) => (tryCount, promise) =>
  promise(tryCount).then(delayPromise(delay))
  .then((data) =>
    (tryCount < howManyTimes && !data.result)
      ? retry(delay, howManyTimes)(data.tryCount, promise)
      : data
  )

module.exports = retry
