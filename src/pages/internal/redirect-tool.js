import React from "react"
import PropTypes from "prop-types"
import { Box } from "@material-ui/core"

const RedirectTool = props => {
  return (
    <Box width={600}>
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
    </Box>
  )
}

RedirectTool.propTypes = {}

export default RedirectTool
