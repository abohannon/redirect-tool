const fs = require("fs")

exports.onPostBuild = () => {
  const buildDir = "public"
  const routes = ["/hey/ /ho/ 301", "/heyo/ /hoho/ 301"]

  const stream = fs.createWriteStream(buildDir + "/_redirects", { flags: "a" })

  routes.forEach(route => {
    stream.write(route + "\n")
  })
}
