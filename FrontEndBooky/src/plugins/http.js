const get = async (url) => {
  const res = await fetch(`http://localhost:4000/` + url)
  return await res.json()
}

const post = async (url, data) => {

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(data)
  }
  const res = await fetch(`http://localhost:4000/` + url, options)
  return await res.json()
}

export { get, post }