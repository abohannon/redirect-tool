const fetch = require("node-fetch")

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

exports.handler = async function (event, context) {
  const encodedBody = encode(JSON.parse(event.body))

  fetch("https://heuristic-clarke-9e129f.netlify.app/internal/redirect-tool/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encodedBody,
  })
    .then(response => {
      console.log("response", response)
      return {
        statusCode: 200,
        response,
      }
    })
    .catch(error => {
      console.log("error", error)
      return {
        statusCode: 500,
        error,
      }
    })
}
