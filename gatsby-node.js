const fs = require("fs")
const fetch = require("node-fetch")

exports.onPostBuild = () => {
  const buildDir = "public"

  const stream = fs.createWriteStream(buildDir + "/_redirects", { flags: "a" })
  const routes = [
    "/hello-friend/ /hello-goodbye/ 301!",
    "/a/ /b/?utm_source=foo 301!",
    "/yes/ /no/?utm_campaign=bar 301!",
  ]

  routes.forEach(route => {
    stream.write(route + "\n")
  })
}
