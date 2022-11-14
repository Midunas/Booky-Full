// import urlJoin from "url-join";
const get = async (url) => {
  return await fetch(url)
}

const post = async (url, data) => {
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(data)
  }
  return await fetch(url, options)
}

export { get, post }
