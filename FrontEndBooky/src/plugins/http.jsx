import urlJoin from "url-join"

const get = async (url) => {
  return await fetch(urlJoin(`http://localhost:4000/`, url))
}

const post = async (url, data) => {
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(data)
  }
  return await fetch(urlJoin(`http://localhost:4000`, url), options)
}

export { get, post }