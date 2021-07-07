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
        <form name="redirect-form" method="post" data-netlify="true">
          <input type="hidden" name="form-name" value="redirect-form" />
          <p>
            <label>
              URL to shorten: <input type="text" name="url" />
            </label>
          </p>
          <p>
            <label>
              Public URL path: <input type="text" name="public_path" />
            </label>
          </p>
          <p>
            <button type="submit">Send</button>
          </p>
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
      <form name="redirect-form" method="post" data-netlify="true">
        <input type="hidden" name="form-name" value="redirect-form" />
        <input type="hidden" name="url" />
        <input type="hidden" name="public_path" />
      </form>
    </Box>
  )
}

RedirectTool.propTypes = {}

export default RedirectTool
