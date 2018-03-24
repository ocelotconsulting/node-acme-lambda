module.exports = links => {
  const match = /.*<(.*)>;rel="terms-of-service".*/.exec(links)
  return (Array.isArray(match) ? {agreement: match[1]} : {})
}
