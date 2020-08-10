const version = 'v1'
const api_prefix = `/api/${version}`

export default {
  privacyPolicy: `${api_prefix}/service/privacypolicy`,
  terms: `${api_prefix}/service/terms`,
  usage: `${api_prefix}/usage`,
}
