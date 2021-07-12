import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import netlifyIdentity from "netlify-identity-widget"
import { Box, Button } from "@material-ui/core"

const RedirectTool = props => {
  const [values, setValues] = useState({
    "form-name": "redirect-form",
    url: "",
    public_path: "",
  })
  const [user, setUser] = useState()

  useEffect(() => {
    netlifyIdentity.init()
  }, [])

  useEffect(() => {
    const user = netlifyIdentity.currentUser()
    console.log("user", user)
    setUser(user)
  }, [user])

  const handleChange = ({ target }) => {
    const { name, value } = target

    setValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }))
  }

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

  const encode = data => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&")
  }

  const handleSubmit = event => {
    event.preventDefault()

    console.log("values", values)

    fetch("http://localhost:51512/.netlify/functions/create-redirect", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "redirect-form",
        ...values,
      }),
    })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.error(error)
      })
  }

  if (user) {
    return (
      <Box width={600} p={4}>
        <form
          id="form"
          name="redirect-form"
          data-netlify="true"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="redirect-form" />
          <p>
            <label>
              URL to shorten:{" "}
              <input
                type="text"
                name="url"
                value={values.url}
                onChange={handleChange}
              />
            </label>
          </p>
          <p>
            <label>
              Public URL path:{" "}
              <input
                type="text"
                name="public_path"
                value={values.public_path}
                onChange={handleChange}
              />
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
    </Box>
  )
}

RedirectTool.propTypes = {}

export default RedirectTool
