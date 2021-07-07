import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import netlifyIdentity from "netlify-identity-widget"
import { Box, Button } from "@material-ui/core"

const RedirectTool = props => {
  const [authed, setAuthed] = useState(false)
  const [user, setUser] = useState()

  useEffect(() => {
    netlifyIdentity.init({})
  }, [])

  const authenticate = (callback = () => {}) => {
    console.log("authenticate")
    netlifyIdentity.open()
    netlifyIdentity.on("login", user => {
      setUser(user)
      callback(user)
    })
  }

  const logout = (callback = () => {}) => {
    netlifyIdentity.logout()
    netlifyIdentity.on("logout", () => {
      setUser(null)
      callback()
    })
  }

  if (user) {
    return (
      <Box width={600} p={4}>
        <form name="redirect" method="post" data-netlify="true">
          <input type="hidden" name="form-name" value="redirect" />
          <div>
            <label>
              URL to shorten: <input type="text" name="url" />
            </label>
          </div>
          <div>
            <label>
              Public URL path: <input type="text" name="public_path" />
            </label>
          </div>
          <div>
            <button type="submit">Send</button>
          </div>
        </form>
        <Button variant="contained" color="primary" onClick={() => logout()}>
          Logout
        </Button>
      </Box>
    )
  }

  return (
    <Box width={600} p={4}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => authenticate()}
      >
        Login
      </Button>
    </Box>
  )
}

RedirectTool.propTypes = {}

export default RedirectTool
