import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@material-ui/core'

const RedirectTool = props => {
  return (
    <Box width={600}>
      <form name="contact" method="post" netlify-honeypot="bot-field" data-netlify="true">
        <input type="hidden" name="bot-field" />
  +     <input type="hidden" name="form-name" value="contact" />
        <p>
          <label>Your Name: <input type="text" name="name" /></label>
        </p>
        <p>
          <label>Your Email: <input type="email" name="email" /></label>
        </p>
        <p>
          <label>Your Role: <select name="role[]" multiple>
            <option value="leader">Leader</option>
            <option value="follower">Follower</option>
          </select></label>
        </p>
        <p>
          <label>Message: <textarea name="message"></textarea></label>
        </p>
        <p>
          <button type="submit">Send</button>
        </p>
      </form>
    </Box>


  )
}

RedirectTool.propTypes = {

}

export default RedirectTool
