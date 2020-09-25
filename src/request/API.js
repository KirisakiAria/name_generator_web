const version = 'v1'
const api_prefix = `/api/${version}/service`

export default {
  download: `${api_prefix}/downloadlink`,
  privacyPolicy: `${api_prefix}/privacypolicy`,
  terms: `${api_prefix}/terms`,
  usage: `${api_prefix}/usage`,
  feedback: `${api_prefix}/feedback`,
  update: `${api_prefix}/update`,
}
