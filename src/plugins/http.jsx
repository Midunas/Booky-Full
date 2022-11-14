import urlJoin from "url-join";
import { HOSTNAME } from '../lib/constants'

const get = async (url) => {
  return await fetch(urlJoin(HOSTNAME, url))
}

const post = async (url, data) => {
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(data)
  }
  return await fetch(urlJoin(`http://localhost:3000`, url), options)
}

export { get, post }
