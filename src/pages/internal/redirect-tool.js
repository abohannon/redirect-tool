import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@material-ui/core'

const RedirectTool = props => {
  return (
    <Box width={600}>
      <form name="redirect" method="POST" netlify>
        <label>Long URL <input type="text" name="longUrl" /></label>

        <button type="submit">Submit</button>
      </form>
    </Box>


  )
}

RedirectTool.propTypes = {

}

export default RedirectTool
